import { Router } from "express";
import { requireRole } from "../../middlewares/role-check";
import { BadRequestError, Roles } from "@deanery-common/shared";
import { Specialty } from "../../models/speciality";
import { SpecialtyCreatedPublisher } from "../../events/publishers/speciality-created-publisher";
import { natsWrapper } from "../../nats-wrapper";
import { CertificateType } from "@deanery-common/shared";

const createSpecialityRouter = Router();
createSpecialityRouter.post("/", requireRole(Roles.Dean), async (req, res) => {
  const { name, faculty, code, coeficients } = req.body;

  if (!Array.isArray(coeficients) || coeficients.length === 0) {
    // Ошибка: coeficients должен быть массивом и не должен быть пустым
    throw new BadRequestError(
      "Invalid coeficients. Should be a non-empty array."
    );
  } else {
    // Проведение дополнительной валидации для каждого элемента массива
    for (const coeff of coeficients) {
      if (
        typeof coeff !== "object" ||
        coeff === null ||
        !("certificateType" in coeff) ||
        !("coefficient" in coeff) ||
        !Object.values(CertificateType).includes(coeff.certificateType)
      ) {
        // Ошибка: каждый элемент должен быть объектом с полями certificateType и coefficient
        throw new BadRequestError(
          `Invalid coefficient object: ${JSON.stringify(coeff)}`
        );
      }
    }
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
  }
});

export { createSpecialityRouter };
