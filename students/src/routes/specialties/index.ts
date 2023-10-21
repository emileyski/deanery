import express from "express";
import { createSpecialityRouter } from "./create";
import { getAllSpecialitiesRouter } from "./getAll";
import { deleteSpecialityRouter } from "./delete";
import { updateSpecialityRouter } from "./update";
const router = express.Router();

router
  .use(createSpecialityRouter)
  .use(getAllSpecialitiesRouter)
  .use(deleteSpecialityRouter)
  .use(updateSpecialityRouter);

export { router as specialitiesRouter };
