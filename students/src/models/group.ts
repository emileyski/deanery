// group.ts
import mongoose from "mongoose";

interface GroupAttrs {
  name: string;
  stream: mongoose.Types.ObjectId | string;
  curator?: string;
}

export interface GroupDoc extends mongoose.Document {
  name: string;
  stream: mongoose.Types.ObjectId;
  curator: string;
}

interface GroupModel extends mongoose.Model<GroupDoc> {
  build(attrs: GroupAttrs): GroupDoc;
}

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    curator: {
      type: String,
      // required: true,
    },
    stream: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stream",
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

groupSchema.set("versionKey", "version");

groupSchema.statics.build = (attrs: GroupAttrs) => {
  return new Group({
    name: attrs.name,
    stream: attrs.stream,
    curator: attrs.curator,
  });
};

const Group = mongoose.model<GroupDoc, GroupModel>("Group", groupSchema);

export { Group };
