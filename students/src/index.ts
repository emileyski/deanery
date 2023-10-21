import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { StudentCreatedListener } from "./events/listeners/student-created-listener";
// import { OrderCreatedListener } from "./events/listeners/order-created-listener";
// import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";

const start = async () => {
  // if (!process.env.JWT_KEY) {
  //   throw new Error("JWT_KEY must be defined!");
  // }

  // if (!process.env.MONGO_URI) {
  //   throw new Error("MONGO_URI is not defined!");
  // }

  // if (!process.env.NATS_CLIENT_ID) {
  //   throw new Error("NATS_CLIENT_ID must be defined");
  // }
  // if (!process.env.NATS_URL) {
  //   throw new Error("NATS_URL must be defined");
  // }
  // if (!process.env.NATS_CLUSTER_ID) {
  //   throw new Error("NATS_CLUSTER_ID must be defined");
  // }
  // console.log(process.env.MONGO_URI!);
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

    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://emilevi4:QKNlcjPJe7LyHxq6@my-cluster.x0cjd1e.mongodb.net/?retryWrites=true&w=majority"
    );

    console.log("Connected to MongoDb");

    new StudentCreatedListener(natsWrapper.client).listen();
  } catch (error) {
    console.error(error);
  }

  app.listen(3002, () => console.log(`Students service listen on port 3002`));

  process.env.JWT_KEY = "some_jwt_access_secret";
};

start();
