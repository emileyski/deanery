import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { NotFoundError, Roles } from "@deanery-common/shared";
import { Group } from "../../models/group";
import { Stream } from "../../models/stream";

const createGroupRouter = Router();
createGroupRouter.post("/", requireRole(Roles.Dean), async (req, res) => {
  const { name, streamId } = req.body;

  const stream = await Stream.findById(streamId);

  if (!stream) {
    throw new NotFoundError();
  }

  console.log(req.body);
  const group = Group.build({ name, stream: stream._id });

  await group.save();

  res.json(group);
});

export { createGroupRouter };
