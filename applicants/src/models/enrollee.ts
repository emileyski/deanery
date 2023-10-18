import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

enum Subject {
  Math = "math",
  English = "english",
  Ukrainian = "ukrainian",
  History = "history",
}

interface Certificate {
  buffer: Buffer;
  contentType: string;
  subject: Subject;
  grade: number;
  documentNumber: string;
}

interface EnrolleeAttrs {
  userId: string;
  birthDate: Date;
  INN?: string;
  certificates?: Certificate[];
}

interface EnrolleeDoc extends Document {
  userId: string;
  birthDate: Date;
  INN: string;
  certificates: Certificate[];
}

interface EnrolleeModel extends mongoose.Model<EnrolleeDoc> {
  build(attrs: EnrolleeAttrs): EnrolleeDoc;
}

const enrolleeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    INN: {
      type: String,
      required: true,
    },
    certificates: [
      {
        buffer: {
          type: Buffer,
          required: true,
        },
        contentType: {
          type: String,
          required: true,
        },
        subject: {
          type: String,
          enum: Object.values(Subject), // устанавливаем возможные значения из enum
          required: true,
        },
        grade: {
          type: Number,
          required: true,
        },
      },
    ],
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

enrolleeSchema.set("versionKey", "version");
enrolleeSchema.plugin(updateIfCurrentPlugin);

enrolleeSchema.statics.build = (attrs: EnrolleeAttrs) => {
  return new Enrollee(attrs);
};
const Enrollee = mongoose.model<EnrolleeDoc, EnrolleeModel>(
  "Enrollee",
  enrolleeSchema
);

export { Enrollee };
