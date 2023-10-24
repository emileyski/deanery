import express from "express";
import "express-async-errors";
import { currentUser, errorHandler } from "@deanery-common/shared";
import { NotFoundError } from "@deanery-common/shared";
import cookieSession from "cookie-session";
import router from "./routes";
// import cors from "cors";

const app = express();

// app.use(cors()); // Add this line to enable CORS

app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

//here routes
app.use("/api/", router);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
