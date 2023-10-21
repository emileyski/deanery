import express from "express";
import { specialitiesRouter } from "./specialties";
import { streamsRouter } from "./streams";
const router = express.Router();

router
  .use("/specialities/", specialitiesRouter)
  .use("/streams/", streamsRouter);

export default router;
