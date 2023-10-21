import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { BadRequestError, Roles } from "@deanery-common/shared";
import { DeaneryRequest } from "../../models/deanery-request";

const router = Router();
router.post("/", requireRole(Roles.Student), async (req, res) => {
  const studentId: string = req.currentUser?.userData.id!;

  const { text, type } = req.body;
  if (!type || !text) {
    throw new BadRequestError("Must be provided type and text");
  }
  const deaneryRequest = DeaneryRequest.build({
    submittedBy: studentId,
    text,
    type,
  });

  await deaneryRequest.save();

  res.json(deaneryRequest);
});

export { router as createDeanApplicationRouter };
//
