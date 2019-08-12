import {store} from "./state";
import * as React from "react";
import {useEffect} from "react";
import {StoreContext} from "redux-react-hook";
import {loadLevel} from "./utils/loadLevel";
import {levels} from "./gamedata/levels";
import {LoadCampaign} from "./state/campaign";
import {ScreenRouter} from "./components/ScreenRouter";
import UrlRoutingService from "./utils/UrlRoutingService";

const App: React.FC = () => {
  useEffect(() => {
    const campaign = UrlRoutingService.getCampaign();
    const level = UrlRoutingService.getLevel();
    console.log(campaign, level)

    if (campaign) {
      store.dispatch(LoadCampaign.create({ campaignId: 'campaign-default' }));
    }

    if (level) {
      const levelObj = levels.find(l => l.id === level)!;
      loadLevel(levelObj, store.dispatch);
    }
  });

  return (
    <StoreContext.Provider value={store}>
      <ScreenRouter />
    </StoreContext.Provider>
  );
};

export default App;
