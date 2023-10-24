import express from "express";
import { createSpecialityRouter } from "./create";
import { getAllSpecialitiesRouter } from "./getAll";
import { deleteSpecialityRouter } from "./delete";
import { updateSpecialityRouter } from "./update";
import { getByIdSpecialityRouter } from "./getById";
const router = express.Router();

router
  .use(createSpecialityRouter)
  .use(getAllSpecialitiesRouter)
  .use(deleteSpecialityRouter)
  .use(updateSpecialityRouter)
  .use(getByIdSpecialityRouter);

export { router as specialitiesRouter };
