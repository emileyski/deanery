import { Router } from "express";
import { Group } from "../../models/group";
import { Student } from "../../models/student";

const getGroupByIdRouter = Router();

getGroupByIdRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  const group = await Group.findById(id);

  const students = await Student.find({ group });

  res.json({ group, students });
});

export { getGroupByIdRouter };
