import express from "express";
import { getAllStudentsRouter } from "./getAllStudents";
import { putToGroupRouter } from "./putToGroup";

const router = express.Router();

router.use(getAllStudentsRouter).use(putToGroupRouter);

export { router as studentsRouter };
