const { body } = require("express-validator");

const signupValidation = () => {
  return [
    body("firstName").isString().notEmpty(),
    body("lastName").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6, max: 32 }),
    body("birthDate")
      .isISO8601()
      .custom((value) => {
        return validator.isBefore(value, new Date().toISOString());
      })
      .withMessage("Birth date must be in the past"),
  ];
};

module.exports = signupValidation;
