// student.ts
import mongoose from "mongoose";

interface StudentAttrs {
  id: string;
  firstName: string;
  lastName: string;
  // specialty: mongoose.Types.ObjectId;
  // stream: mongoose.Types.ObjectId;
  group?: mongoose.Types.ObjectId;
}

export interface StudentDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  specialty: mongoose.Types.ObjectId;
  stream: mongoose.Types.ObjectId;
  group: mongoose.Types.ObjectId;
}

interface StudentModel extends mongoose.Model<StudentDoc> {
  build(attrs: StudentAttrs): StudentDoc;
}

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      // required: true,
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

studentSchema.set("versionKey", "version");

studentSchema.statics.build = (attrs: StudentAttrs) => {
  return new Student({
    _id: attrs.id,
    firstName: attrs.firstName,
    lastName: attrs.lastName,
    // specialty: attrs.specialty,
    // stream: attrs.stream,
    group: attrs.group,
  });
};

const Student = mongoose.model<StudentDoc, StudentModel>(
  "Student",
  studentSchema
);

export { Student };
