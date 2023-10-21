import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { Roles } from "@deanery-common/shared";
import { DeaneryRequest } from "../../models/deanery-request";

const router = Router();
router.get("/my", requireRole(Roles.Student), async (req, res) => {
  const studentId: string = req.currentUser?.userData.id!;

  const data = await DeaneryRequest.find({ submittedBy: studentId });
  res.json(data);
});

export { router as getMyDeanApplicationRouter };
