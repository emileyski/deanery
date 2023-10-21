import { Router } from "express";
import { Stream } from "../../models/stream";

const getAllStreamsRouter = Router();

getAllStreamsRouter.get("/", async (req, res) => {
  const specialities = await Stream.find();

  res.json(specialities);
});

export { getAllStreamsRouter };
