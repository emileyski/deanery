import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { NotFoundError, Roles } from "@deanery-common/shared";
import { Stream } from "../../models/stream";
import { Group } from "../../models/group";

const deleteStreamRouter = Router();
deleteStreamRouter.delete("/:id", requireRole(Roles.Dean), async (req, res) => {
  const { id } = req.params;

  const stream = await Stream.findByIdAndDelete(id);

  if (!stream) {
    throw new NotFoundError();
  }
  const groups = await Group.deleteMany({ stream: id });

  res.json({ stream, groups: groups || [] });
});

export { deleteStreamRouter };
