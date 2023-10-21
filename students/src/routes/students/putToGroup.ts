import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { BadRequestError, Roles } from "@deanery-common/shared";
import { Student } from "../../models/student";
import { Group } from "../../models/group";

const putToGroupRouter = Router();
putToGroupRouter.put("/togroup", requireRole(Roles.Dean), async (req, res) => {
  const { studentId, groupId } = req.body;
  const student = await Student.findById(studentId);
  const group = await Group.findById(groupId);

  if (!student || !group) {
    throw new BadRequestError("Student or group not exist");
  }

  student.group = group!._id;
  await student.save();

  await student.populate("group");
  res.json(student);
});

export { putToGroupRouter };
