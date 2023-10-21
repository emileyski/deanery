import { Router } from "express";
import { Student } from "../../models/student";

const getAllStudentsRouter = Router();

getAllStudentsRouter.get("/", async (req, res) => {
  const specialities = await Student.find();

  res.json(specialities);
});

export { getAllStudentsRouter };
