import { Router } from "express";
import { Specialty } from "../../models/speciality";

const getAllSpecialitiesRouter = Router();

getAllSpecialitiesRouter.get("/", async (req, res) => {
  const specialities = await Specialty.find();

  res.json(specialities);
});

export { getAllSpecialitiesRouter };
