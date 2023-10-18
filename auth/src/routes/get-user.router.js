const { Router } = require("express");
const authenticateAccessTokenMiddleware = require("../middlewares/authenticate-access-token.middleware");
const FileModel = require("../models/File");
const { BadRequestError } = require("@deanery-common/shared");

const router = new Router();

router.get("/user", authenticateAccessTokenMiddleware, (req, res) => {
  res.json(req.user.userData);
});

router.get(
  "/photo",
  authenticateAccessTokenMiddleware,
  async (req, res, next) => {
    try {
      if (req.user.userPhoto) {
        next(new BadRequestError("You haven't uploaded a photo"));
      }

      const fileId = req.user.userPhoto;

      const file = await FileModel.findById(fileId);

      if (!file) {
        return res.status(404).send("Файл не найден");
      }

      res.setHeader("Content-Type", file.contentType);

      res.send(file.data);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = { getUserRouter: router };
