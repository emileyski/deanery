import express from "express";
import { createStreamRouter } from "./create";
import { getAllStreamsRouter } from "./getAllStreams";
import { getByIdStreamRouter } from "./getById";
import { deleteStreamRouter } from "./delete";

const router = express.Router();

router
  .use(createStreamRouter)
  .use(getAllStreamsRouter)
  .use(getByIdStreamRouter)
  .use(deleteStreamRouter);

export { router as streamsRouter };
