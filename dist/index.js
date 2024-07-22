"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const node_cron_1 = __importDefault(require("node-cron"));
const actionService_1 = __importDefault(require("./services/actionService"));
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eos-actions";
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    node_cron_1.default.schedule("* * * * *", actionService_1.default);
})
    .catch((err) => {
    console.error("Error connecting to MongoDB", err);
});
