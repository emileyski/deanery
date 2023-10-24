import express from "express";
import { createGroupRouter } from "./create";
import { getAllGroupsRouter } from "./getAll";
import { getGroupByIdRouter } from "./getById";

const router = express.Router();

router.use(createGroupRouter).use(getAllGroupsRouter).use(getGroupByIdRouter);

export { router as groupsRouter };
