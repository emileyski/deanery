const { NotAuthorizedError } = require("@deanery-common/shared");
const { JWT_ACCESS_SECRET } = require("../credentials");
const jwt = require("jsonwebtoken");

const authenticateAccessTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    throw new NotAuthorizedError();
  }

  jwt.verify(token, JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      throw new NotAuthorizedError();
    }

    if (user.password) {
      delete user.password;
    }

    req.user = user.userData;
    next();
  });
};

module.exports = authenticateAccessTokenMiddleware;
