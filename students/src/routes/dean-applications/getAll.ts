import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { Roles } from "@deanery-common/shared";
import { DeaneryRequest } from "../../models/deanery-request";

const router = Router();
router.get("/", requireRole(Roles.Dean), async (req, res) => {
  const data = await DeaneryRequest.find().populate("submittedBy");
  res.json(data);
});

export { router as getAllDeanApplicationRouter };
