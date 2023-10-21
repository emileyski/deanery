import mongoose, { Schema } from "mongoose";

enum DeaneryRequestType {
  AcademicQuestions = "AcademicQuestions",
  FinancialIssues = "FinancialIssues",
  HealthAndWellness = "HealthAndWellness",
  OrganizationalMatters = "OrganizationalMatters",
  CareerRelated = "CareerRelated",
  ConflictsAndSafety = "ConflictsAndSafety",
  TechnicalIssues = "TechnicalIssues",
  SuggestionsAndFeedback = "SuggestionsAndFeedback",
  WithdrawalRequest = "WithdrawalRequest",
}

enum DeaneryRequestStatus {
  Pending = "Pending",
  InProgress = "InProgress",
  Resolved = "Resolved",
  Rejected = "Rejected",
}

interface DeaneryRequestAttrs {
  submissionDate?: Date;
  submittedBy: string; // Ссылка на студента
  text: string;
  type: DeaneryRequestType;
}

export interface DeaneryRequestDoc extends mongoose.Document {
  submissionDate: Date;
  submittedBy: Schema.Types.ObjectId;
  text: string;
  type: DeaneryRequestType;
  status: DeaneryRequestStatus;
  verdict: string;
}

interface DeaneryRequestModel extends mongoose.Model<DeaneryRequestDoc> {
  build(attrs: DeaneryRequestAttrs): DeaneryRequestDoc;
}

const deaneryRequestSchema = new mongoose.Schema(
  {
    submissionDate: {
      type: Date,
      default: Date.now,
    },
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(DeaneryRequestType),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(DeaneryRequestStatus),
      default: DeaneryRequestStatus.Pending,
    },
    verdict: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

deaneryRequestSchema.set("versionKey", "version");

deaneryRequestSchema.statics.build = (attrs: DeaneryRequestAttrs) => {
  return new DeaneryRequest(attrs);
};

const DeaneryRequest = mongoose.model<DeaneryRequestDoc, DeaneryRequestModel>(
  "DeaneryRequest",
  deaneryRequestSchema
);

export { DeaneryRequest, DeaneryRequestType, DeaneryRequestStatus };
