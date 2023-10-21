import { Router } from "express";
import { Specialty } from "../../models/speciality";
import { requireRole } from "../../middlewares/role-check";
import { Roles } from "@deanery-common/shared";

const deleteSpecialityRouter = Router();

deleteSpecialityRouter.delete(
  "/:id",
  requireRole(Roles.Dean),
  async (req, res) => {
    const specId = req.params.id;
    await Specialty.deleteOne({ _id: specId });

    res.json({ message: `Specialty with ID ${specId} succesfully deleted.` });
  }
);

export { deleteSpecialityRouter };
