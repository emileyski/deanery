import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { StudentCreatedListener } from "./events/listeners/student-created-listener";

const start = async () => {
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID || "deanery",
      process.env.NATS_CLIENT_ID || "students-service",
      process.env.NATS_URL || "http://localhost:4222"
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connnection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI!);

    console.log("Connected to MongoDb");

    new StudentCreatedListener(natsWrapper.client).listen();
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => console.log(`Students service listen on port 3000`));

  if (!process.env.JWT_KEY) process.env.JWT_KEY = "some_jwt_access_secret";
};

start();
