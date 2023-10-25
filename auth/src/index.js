require("express-async-errors");
const express = require("express");
const cors = require("cors"); // Add this line
const passport = require("passport");
const mongoose = require("mongoose");
const { MONGO_URL } = require("./credentials");
const localStrategy = require("./strategies/local.strategy");
var cookieParser = require("cookie-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const router = require("./routes");
const options = require("./swagger.options");
var bodyParser = require("body-parser");
const { NotFoundError } = require("@deanery-common/shared");
const errorHandler = require("./middlewares/error.middleware");
const natsWrapper = require("./nats-wrapper");
const StudentCreatedListener = require("./events/listeners/student-created-listener");

const app = express();

app.use(cors()); // Add this line to enable CORS

const specs = swaggerJsdoc(options);
app.use(
  "/api/auth/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(passport.initialize());

passport.use(localStrategy);

app.use("/api/auth", router);

app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});
app.use(errorHandler);

const PORT = 3000;

const start = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID || "deanery",
    process.env.NATS_CLIENT_ID || "auth-service",
    process.env.NATS_URL || "http://localhost:4222"
  );

  new StudentCreatedListener(natsWrapper.client).listen();

  app.listen(PORT, () => {
    console.log(`Auth service is running at ${PORT} (v1)`);
  });
};

start();
