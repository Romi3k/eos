import { Schema, model, Document } from "mongoose";

interface IAction extends Document {
  trx_id: string;
  block_time: string;
  block_num: number;
}

const actionSchema = new Schema<IAction>({
  trx_id: { type: String, unique: true, required: true },
  block_time: { type: String, required: true },
  block_num: { type: Number, required: true },
});

const Action = model<IAction>("Action", actionSchema);

export default Action;
export { IAction };
