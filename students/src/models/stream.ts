// stream.ts
import mongoose from "mongoose";

interface StreamAttrs {
  name: string;
  specialty: mongoose.Types.ObjectId; // Ссылка на Specialty
}

export interface StreamDoc extends mongoose.Document {
  name: string;
  specialty: mongoose.Types.ObjectId;
}

interface StreamModel extends mongoose.Model<StreamDoc> {
  build(attrs: StreamAttrs): StreamDoc;
}

const streamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    specialty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty", // Ссылка на Specialty
      required: true,
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

streamSchema.set("versionKey", "version");

streamSchema.statics.build = (attrs: StreamAttrs) => {
  return new Stream({
    name: attrs.name,
    specialty: attrs.specialty,
  });
};

const Stream = mongoose.model<StreamDoc, StreamModel>("Stream", streamSchema);

export { Stream };
