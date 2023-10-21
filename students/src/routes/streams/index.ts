import express from "express";
import { createStreamRouter } from "./create";
import { getAllStreamsRouter } from "./getAllStreams";

const router = express.Router();

router.use(createStreamRouter).use(getAllStreamsRouter);

export { router as streamsRouter };
