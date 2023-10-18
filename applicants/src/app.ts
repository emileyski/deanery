import express from "express";
import "express-async-errors";

// import { currentUserRouter } from "./routes/current-user";
// import { signinUserRouter } from "./routes/signin";
// import { signoutUserRouter } from "./routes/signout";
// import { signupUserRouter } from "./routes/signup";
// import { createTicketRouter } from "./routes/new";

import { errorHandler } from "@emilevi4-co/common";
import { NotFoundError } from "@emilevi4-co/common";
import cookieSession from "cookie-session";
// import { showTicketRouter } from "./routes/show";
// import { updateTicketRouter } from "./routes/update";
// import { indexTicketRouter } from "./routes";

const app = express();
app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

// app.use(createTicketRouter);
// app.use(showTicketRouter);
// app.use(indexTicketRouter);
// app.use(updateTicketRouter);
// app.use(signinUserRouter);
// app.use(signoutUserRouter);
// app.use(signupUserRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
