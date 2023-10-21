import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { BadRequestError, Roles } from "@deanery-common/shared";
import { DeaneryRequest } from "../../models/deanery-request";

const router = Router();
router.get("/my/:id", requireRole(Roles.Student), async (req, res) => {
  const studentId: string = req.currentUser?.userData.id!;
  const applicationId = req.params.id;

  const expectant = await DeaneryRequest.findOne({
    _id: applicationId,
    submittedBy: studentId,
  });

  if (!expectant) {
    throw new BadRequestError("application not found");
  }

  res.json(expectant);
});

export { router as getMyDeanApplicationByIdRouter };
