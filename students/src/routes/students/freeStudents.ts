import { Router } from "express";
import { Student } from "../../models/student";

const getFreeStudentsRouter = Router();

getFreeStudentsRouter.get("/free", async (req, res) => {
  const specialities = await Student.find({ group: null });

  res.json(specialities);
});

export { getFreeStudentsRouter };
