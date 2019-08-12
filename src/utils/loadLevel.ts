import {ILevel, IResource} from "../types";
import {Dispatch} from "redoodle";
import {PlaceTile, ResetBoard, SetEmptyTile} from "../state/board";
import tiles from "../gamedata/tiles";
import {DefineAbstractTile, ResetAbstractTileDefinitions} from "../state/tiles";
import {AddCard, ResetCards, SetDeck, TakeCardFromDeck} from "../state/cards";
import resources from "../gamedata/resources";
import {DefineResource, ResetResourcesList} from "../state/resources";
import {LoadLevel} from "../state/level";
import {SetPrimaryColor} from "../state/color";

export const loadLevel = (level: ILevel, dispatch: Dispatch) => {
  cleanState(dispatch);
  defineResources(level, dispatch);
  defineTiles(level, dispatch);
  addCards(level, dispatch);
  loadBoard(level, dispatch);
  dispatch(LoadLevel.create({ level }));
  if (level.primaryColor) {
    dispatch(SetPrimaryColor.create({ color: level.primaryColor }));
  }
};

const cleanState = (dispatch: Dispatch) => {
  dispatch(LoadLevel.create({}));
  dispatch(ResetBoard.create({}));
  dispatch(ResetAbstractTileDefinitions.create({}));
  dispatch(ResetResourcesList.create({}));
  dispatch(ResetCards.create({}));
};

const defineResources = (level: ILevel, dispatch: Dispatch) => {
  resources
    .forEach((resource: IResource) => dispatch(DefineResource.create({ resource })));
};

const defineTiles = (level: ILevel, dispatch: Dispatch) => {
  tiles.forEach(abstractTile => {
    dispatch(DefineAbstractTile.create({ abstractTile }));
  });
};

const addCards = (level: ILevel, dispatch: Dispatch) => {
  if (level.gamemode === "emptycards" || level.gamemode === "sandbox") {
    for (let abstractTileId of level.cards) {
      dispatch(AddCard.create({ abstractTileId }));
    }
  } else if (level.gamemode === "cityfill") {
    dispatch(SetDeck.create({ cards: level.cards }));
    dispatch(TakeCardFromDeck.create({ count: 4 }));
  }
};

const loadBoard = (level: ILevel, dispatch: Dispatch) => {
  let x = 0;
  let y = 0;
  for (let row of level.tilemap) {
    for (let piece of row.split('')) {
      const resolvedPiece = level.tilemapLegend[piece];

      if (resolvedPiece) {
        if (resolvedPiece.type === "placed") {
          const abstractTile = [...tiles, ...(level.extraTiles || [])].find(t => t.id === resolvedPiece.tileId);

          if (!abstractTile) {
            throw Error(`Could not resolve tile ${resolvedPiece.tileId}.`);
          }

          dispatch(PlaceTile.create({ abstractTile, x, y }));
        } else if (resolvedPiece.type === "empty") {
          dispatch(SetEmptyTile.create({ x, y, asset: resolvedPiece.asset, resources: resolvedPiece.resources }));
        }
      }

      x++;
    }
    y++;
    x = 0;
  }
};

