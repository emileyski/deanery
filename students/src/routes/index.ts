import express from "express";
import { specialitiesRouter } from "./specialties";
import { streamsRouter } from "./streams";
import { groupsRouter } from "./groups";
import { studentsRouter } from "./students";
import { deanApplicationsRouter } from "./dean-applications";
const router = express.Router();

router
  .use("/specialities/", specialitiesRouter)
  .use("/streams/", streamsRouter)
  .use("/groups/", groupsRouter)
  .use("/students/", studentsRouter)
  .use("/dean-applications", deanApplicationsRouter);

export default router;
