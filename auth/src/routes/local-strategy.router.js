const { Router } = require("express");
const passport = require("passport");
const User = require("../models/User");
const getTokens = require("../utils");
const signupValidation = require("../middlewares/validation/signup.validation");
const upload = require("../multer-config");
const FileModel = require("../models/File");
const AccountCreatedPublisher = require("../events/publishers/account-created-publisher");
const natsWrapper = require("../nats-wrapper");

const router = new Router();

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    // Вход выполнен успешно
    res.cookie("refreshToken", req.user.refreshToken, { httpOnly: true });

    res.json({
      accessToken: req.user.accessToken,
      refreshToken: req.user.refreshToken,
      userData: req.user.userData,
    });
  }
);

router.post(
  "/signup",
  signupValidation(),
  upload.single("userPhoto"),
  async (req, res) => {
    const { email, firstName, lastName, birthDate, password, gender } =
      req.body;

    let userPhotoRef;
    const userPhoto = req.file;

    if (userPhoto) {
      const newFile = new FileModel({
        data: req.file.buffer,
        contentType: req.file.mimetype,
      });

      await newFile.save();

      userPhotoRef = newFile._id;
    }

    const user = new User({
      email,
      firstName,
      lastName,
      birthDate,
      userPhoto: userPhotoRef,
      roles: ["enrollee"],
      gender,
    });
    await user.setPassword(password);
    await user.save();

    //TODO дописать публишер
    new AccountCreatedPublisher(natsWrapper.client).publish({
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
    });

    const { accessToken, refreshToken } = getTokens(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    // Регистрация выполнена успешно
    res.status(201).json({ accessToken, refreshToken, userData: user });
  }
);

module.exports = { localStrategyRouter: router };
