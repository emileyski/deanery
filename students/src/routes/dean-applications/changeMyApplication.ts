import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { BadRequestError, Roles } from "@deanery-common/shared";
import { DeaneryRequest } from "../../models/deanery-request";

const router = Router();
router.patch("/my/:id", requireRole(Roles.Student), async (req, res) => {
  const studentId: string = req.currentUser?.userData.id!;
  const applicationId = req.params.id;

  const { text, type } = req.body;
  if (!type || !text) {
    throw new BadRequestError("Must be provided type and text");
  }

  const expectant = await DeaneryRequest.findOne({
    _id: applicationId,
    submittedBy: studentId,
  });

  if (!expectant) {
    throw new BadRequestError("application not found");
  }

  expectant.set({ text, type });
  await expectant.save();

  res.json(expectant);
});

export { router as changeMyDeanApplicationRouter };
