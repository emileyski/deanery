import { Router } from "express";
import { Stream } from "../../models/stream";
import { Group } from "../../models/group";
import { BadRequestError } from "@deanery-common/shared";

const getByIdStreamRouter = Router();

getByIdStreamRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  const stream = await Stream.findById(id);
  if (!stream) {
    throw new BadRequestError("Stream not found");
  }

  const groups = await Group.find({ stream });

  res.json({ stream, groups: groups || [] });
});

export { getByIdStreamRouter };
