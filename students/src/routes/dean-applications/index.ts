import express from "express";
import { createDeanApplicationRouter } from "./create";
import { getAllDeanApplicationRouter } from "./getAll";
import { getMyDeanApplicationRouter } from "./getByStudent";
import { deleteMyDeanApplicationRouter } from "./deleteMyApplication";
import { getMyDeanApplicationByIdRouter } from "./getMyById";
import { changeMyDeanApplicationRouter } from "./changeMyApplication";
import { makeRequestDeanApplicationRouter } from "./make-application-request";

const router = express.Router();

router
  .use(createDeanApplicationRouter)
  .use(getAllDeanApplicationRouter)
  .use(getMyDeanApplicationRouter)
  .use(deleteMyDeanApplicationRouter)
  .use(getMyDeanApplicationByIdRouter)
  .use(changeMyDeanApplicationRouter)
  .use(makeRequestDeanApplicationRouter);

export { router as deanApplicationsRouter };
