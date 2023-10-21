import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { BadRequestError, Roles } from "@deanery-common/shared";
import { DeaneryRequest } from "../../models/deanery-request";

const router = Router();
router.patch("/:id", requireRole(Roles.Dean), async (req, res) => {
  const applicationId = req.params.id;
  const { verdict, status } = req.body;

  const expectant = await DeaneryRequest.findOne({
    _id: applicationId,
  });

  if (!expectant) {
    throw new BadRequestError("application not found");
  }

  expectant.set({ verdict, status });
  await expectant.save();

  res.json(expectant);
});

export { router as makeRequestDeanApplicationRouter };
