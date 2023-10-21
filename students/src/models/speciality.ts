// specialty.ts
import mongoose from "mongoose";

interface SpecialtyAttrs {
  name: string;
  faculty: string;
  code: string;
}

export interface SpecialtyDoc extends mongoose.Document {
  name: string;
  faculty: string;
  code: string;
  availableForRecruitment: boolean;
}

interface SpecialtyModel extends mongoose.Model<SpecialtyDoc> {
  build(attrs: SpecialtyAttrs): SpecialtyDoc;
}

const specialtySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    availableForRecruitment: { type: Boolean, required: true, default: true },
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

specialtySchema.set("versionKey", "version");

specialtySchema.statics.build = (attrs: SpecialtyAttrs) => {
  return new Specialty({
    name: attrs.name,
    faculty: attrs.faculty,
    code: attrs.code,
  });
};

const Specialty = mongoose.model<SpecialtyDoc, SpecialtyModel>(
  "Specialty",
  specialtySchema
);

export { Specialty };
