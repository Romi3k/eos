"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const actionSchema = new mongoose_1.Schema({
    trx_id: { type: String, unique: true, required: true },
    block_time: { type: String, required: true },
    block_num: { type: Number, required: true },
});
const Action = (0, mongoose_1.model)("Action", actionSchema);
exports.default = Action;
