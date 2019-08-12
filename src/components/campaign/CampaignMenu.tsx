import * as React from "react";
import {TileBoardContainer} from "../commonui/TileBoardContainer";
import {useDispatch, useMappedState} from "redux-react-hook";
import {IReduxState} from "../../types";
import {loadCampaignBoard} from "../../utils/loadCampaignBoard";
import {Tile} from "../commonui/Tile";
import {levels} from "../../gamedata/levels";
import {loadLevel} from "../../utils/loadLevel";
import {EmphasizedText} from "../commonui/EmphasizedText";
import {useUrlRouting} from "../../hooks";
import {CampaignTitle} from "./CampaignTitle";


export const CampaignMenu: React.FC<{}> = props => {
  const dispatch = useDispatch();
  const { campaign } = useMappedState((state: IReduxState) => ({
    campaign: state.campaign!
  }));
  useUrlRouting({ campaignId: campaign.id });

  const campaignBoard = loadCampaignBoard(campaign, levels);

  return (
    <>
      <TileBoardContainer backgroundColor={campaign.backgroundColor} initialCentering={campaign.centering}>
        {
          campaignBoard.map(tile => (
            <Tile
              key={`${tile.x}-${tile.y}`}
              tile={{
                x: tile.x,
                y: tile.y,
                asset: tile.asset,
                type: 'empty',
                resources: []
              }}
              onClick={() => {
                loadLevel(tile.level, dispatch);
              }}
              onHover={() => {}}
            >
              <EmphasizedText text={tile.level.name}/>
            </Tile>
          ))
        }
      </TileBoardContainer>
      <CampaignTitle/>
    </>
  )
};
