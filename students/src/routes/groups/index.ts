import express from "express";
import { createGroupRouter } from "./create";
import { getAllGroupsRouter } from "./getAll";

const router = express.Router();

router.use(createGroupRouter).use(getAllGroupsRouter);

export { router as groupsRouter };
