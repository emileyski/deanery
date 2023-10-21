import { Router } from "express";
import { Specialty } from "../../models/speciality";
import { requireRole } from "../../middlewares/role-check";
import { Roles } from "@deanery-common/shared";

const updateSpecialityRouter = Router();

updateSpecialityRouter.patch(
  "/:id",
  requireRole(Roles.Dean),
  async (req, res) => {
    const updateData = req.body;
    const specId = req.params.id;

    await Specialty.updateOne({ _id: specId }, { ...updateData });

    const newSpecialty = await Specialty.findOne({ _id: specId });

    res.json(newSpecialty);
  }
);

export { updateSpecialityRouter };
