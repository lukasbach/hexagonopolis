import {TypedAction, TypedReducer} from "redoodle";
import {ICampaign} from "../types";
import {campaigns} from "../gamedata/campaigns";

export const LoadCampaign = TypedAction.define("@@campaign/load")<{
  campaignId: string;
}>();

export const LeaveCampaign = TypedAction.define("@@campaign/leave")<{}>();

const reducer = TypedReducer.builder<ICampaign | undefined>()
  .withHandler(LoadCampaign.TYPE, (state, { campaignId }) => {
    const campaign = campaigns.find(c => c.id === campaignId);

    if (!campaign) {
      throw Error(`Could not find campaign with ID ${campaignId}.`);
    }

    return campaign;
  })
  .withHandler(LeaveCampaign.TYPE, () => undefined)
  .build();

export default reducer;