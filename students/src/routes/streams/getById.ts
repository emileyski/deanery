import { Router } from "express";
import { Stream } from "../../models/stream";
import { Group } from "../../models/group";

const getByIdStreamRouter = Router();

getByIdStreamRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const stream = await Stream.findById(id);
  const groups = await Group.find({ stream });

  res.json({ stream, groups: groups || [] });
});

export { getByIdStreamRouter };
