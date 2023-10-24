import express from "express";
import { createStreamRouter } from "./create";
import { getAllStreamsRouter } from "./getAllStreams";
import { getByIdStreamRouter } from "./getById";

const router = express.Router();

router
  .use(createStreamRouter)
  .use(getAllStreamsRouter)
  .use(getByIdStreamRouter);

export { router as streamsRouter };
