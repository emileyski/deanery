import { Router } from "express";
import { Specialty } from "../../models/speciality";
import { Stream } from "../../models/stream";

const getByIdSpecialityRouter = Router();

getByIdSpecialityRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const specialty = await Specialty.findById(id);
  const streams = await Stream.find({ specialty });

  res.json({ specialty, streams });
});

export { getByIdSpecialityRouter };
