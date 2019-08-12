import {ICampaign, ILevel} from "../types";

interface ICampaignBoardTile {
  x: number;
  y: number;
  asset: string;
  levelId: string;
  requires: string[];
  level: ILevel;
}

export const loadCampaignBoard = (campaign: ICampaign, levels: ILevel[]): ICampaignBoardTile[] => {
  const result: ICampaignBoardTile[] = [];

  let x = 0;
  let y = 0;
  for (let row of campaign.tilemap) {
    for (let piece of row.split('')) {
      const resolvedPiece = campaign.tilemapLegend[piece];

      if (resolvedPiece) {
        result.push({
          asset: resolvedPiece.asset,
          levelId: resolvedPiece.levelId,
          requires: resolvedPiece.requires,
          level: levels.find(l => l.id === resolvedPiece.levelId)!,
          x, y
        });
      }

      x++;
    }
    y++;
    x = 0;
  }

  return result;
};
