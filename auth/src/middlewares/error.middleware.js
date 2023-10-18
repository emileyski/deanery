const { CustomError } = require("@deanery-common/shared");

// module.exports = (error, req, res, next) => {
//   //   console.log(error);
//   if (error.code === 11000) {
//     // Обработка ошибки дубликата nickname
//     return res.status(409).json({ message: error.message });
//   }
//   console.log(error);
//   return res.status(500).json({ message: "Internal Server Error" });
// };

const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).send({
      errors: [{ message: err.message }],
    });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // console.error(err);
  res.status(400).send({
    errors: [{ message: "Something went wrong..." }],
  });
};

module.exports = errorHandler;
