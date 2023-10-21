import { Router } from "express";
import { Group } from "../../models/group";

const getAllGroupsRouter = Router();

getAllGroupsRouter.get("/", async (req, res) => {
  const groups = await Group.find();

  res.json(groups);
});

export { getAllGroupsRouter };
