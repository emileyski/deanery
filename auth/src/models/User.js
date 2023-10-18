const { Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email format",
      },
    },
    birthDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return validator.isBefore(value.toString(), new Date().toString());
        },
        message: "Birth date must be in the past",
      },
    },
    roles: {
      type: [String],
      enum: ["enrollee", "student", "dean"],
      default: "enrollee",
    },
    //дата регистрации
    regDate: {
      type: Date,
      default: Date.now,
    },
    userPhoto: {
      type: Schema.Types.ObjectId,
      ref: "File", // Имя коллекции, к которой создается ссылка
    },
    gender: {
      type: String,
      enum: ["male", "female", "unspecified"],
      default: "unspecified",
    },
    password: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.salt;
      },
    },
  }
);

userSchema.set("versionKey", "version");

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email", // Здесь указывается, что поле email будет использоваться вместо username
  hashField: "password",
  errorMessages: {
    MissingPasswordError: "Password is required", // Специфичное сообщение об ошибке
  },
});

const User = model("User", userSchema);

module.exports = User;
