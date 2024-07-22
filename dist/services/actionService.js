"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const action_1 = __importDefault(require("../models/action"));
const fetchActions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("https://eos.greymass.com/v1/history/get_actions", {
            account_name: "eosio",
            pos: -1,
            offset: -100,
        });
        const actions = response.data.actions;
        for (const action of actions) {
            const { trx_id, block_time, block_num } = action.action_trace;
            const existingAction = yield action_1.default.findOne({ trx_id });
            if (!existingAction) {
                const newAction = new action_1.default({
                    trx_id,
                    block_time,
                    block_num,
                });
                yield newAction.save();
                console.log(`Saved action with trx_id: ${trx_id}`);
            }
            else {
                console.log(`Action with trx_id: ${trx_id} already exists`);
            }
        }
    }
    catch (error) {
        console.error("Error fetching actions", error);
    }
});
exports.default = fetchActions;
