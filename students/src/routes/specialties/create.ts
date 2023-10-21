import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { Roles } from "@deanery-common/shared";
import { Specialty } from "../../models/speciality";
import { SpecialtyCreatedPublisher } from "../../events/publishers/speciality-created-publisher";
import { natsWrapper } from "../../nats-wrapper";

const createSpecialityRouter = Router();
createSpecialityRouter.post("/", requireRole(Roles.Dean), async (req, res) => {
  const { name, faculty, code, coeficients } = req.body;
  const speciality = Specialty.build({ name, faculty, code });

  await speciality.save();

  new SpecialtyCreatedPublisher(natsWrapper.client).publish({
    id: speciality._id,
    code,
    faculty,
    specialityName: name,
    coeficients,
  });

  res.json(speciality);
});

export { createSpecialityRouter };
