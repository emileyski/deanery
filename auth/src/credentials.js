const JWT_ACCESS_SECRET = process.env.JWT_KEY || "some_jwt_access_secret";
const JWT_REFRESH_SECRET = process.env.JWT_KEY || "some_jwt_refresh_secret";
const MONGO_URL =
  process.env.MONGO_URI ||
  "mongodb+srv://emilevi4:QKNlcjPJe7LyHxq6@my-cluster.x0cjd1e.mongodb.net/?retryWrites=true&w=majority";

// console.log(JWT_ACCESS_SECRET, "\n", JWT_REFRESH_SECRET, "\n", MONGO_URL, "\n");

module.exports = {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  MONGO_URL,
};
