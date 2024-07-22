import axios from "axios";
import Action, { IAction } from "../models/action";

const fetchActions = async () => {
  try {
    const response = await axios.post(
      "https://eos.greymass.com/v1/history/get_actions",
      {
        account_name: "eosio",
        pos: -1,
        offset: -100,
      }
    );

    const actions = response.data.actions;

    for (const action of actions) {
      const { trx_id, block_time, block_num } = action.action_trace;

      const existingAction = await Action.findOne({ trx_id });

      if (!existingAction) {
        const newAction: IAction = new Action({
          trx_id,
          block_time,
          block_num,
        });
        await newAction.save();
        console.log(`Saved action with trx_id: ${trx_id}`);
      } else {
        console.log(`Action with trx_id: ${trx_id} already exists`);
      }
    }
  } catch (error) {
    console.error("Error fetching actions", error);
  }
};

export default fetchActions;
