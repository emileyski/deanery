// group.ts
import mongoose from "mongoose";

interface GroupAttrs {
  id: string;
  name: string;
  stream: mongoose.Types.ObjectId;
}

export interface GroupDoc extends mongoose.Document {
  name: string;
  stream: mongoose.Types.ObjectId;
}

interface GroupModel extends mongoose.Model<GroupDoc> {
  build(attrs: GroupAttrs): GroupDoc;
}

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
});

groupSchema.statics.build = (attrs: GroupAttrs) => {
  return new Group({
    _id: attrs.id,
    name: attrs.name,
  });
};

const Group = mongoose.model<GroupDoc, GroupModel>("Group", groupSchema);

export { Group };
