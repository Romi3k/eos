import mongoose from "mongoose";
import cron from "node-cron";
import fetchActions from "./services/actionService";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/eos-actions";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    cron.schedule("* * * * *", fetchActions);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
