import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { Roles } from "@deanery-common/shared";
import { Stream } from "../../models/stream";

const createStreamRouter = Router();
createStreamRouter.post("/", requireRole(Roles.Dean), async (req, res) => {
  const { name, specialty } = req.body;
  console.log(req.body);
  const stream = Stream.build({ name, specialty });

  await stream.save();

  res.json(stream);
});

export { createStreamRouter };
