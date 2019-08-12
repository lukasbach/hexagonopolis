import * as React from "react";
import {useMappedState} from "redux-react-hook";
import {IReduxState} from "../types";
import {GameContainer} from "./level/GameContainer";
import {CampaignMenu} from "./campaign/CampaignMenu";
import {MainMenu} from "./menu/MainMenu";


export const ScreenRouter: React.FC<{}> = props => {
  const { isInGame, isInCampaign, isInMainMenu } = useMappedState((state: IReduxState) => ({
    isInGame: !!state.level,
    isInCampaign: !state.level && !!state.campaign,
    isInMainMenu: !state.level && !state.campaign
  }));

  return (
    <>
      {
        isInGame
          ? <GameContainer />
          : isInCampaign
          ? <CampaignMenu />
          : isInMainMenu
          ? <MainMenu />
          : <div>Routing Error</div>
      }
    </>
  )
};
