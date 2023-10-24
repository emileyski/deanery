import express from "express";
import { getAllStudentsRouter } from "./getAllStudents";
import { putToGroupRouter } from "./putToGroup";
import { getFreeStudentsRouter } from "./freeStudents";

const router = express.Router();

router
  .use(getAllStudentsRouter)
  .use(putToGroupRouter)
  .use(getFreeStudentsRouter);

export { router as studentsRouter };
