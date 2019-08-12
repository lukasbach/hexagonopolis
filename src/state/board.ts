import {setWith, TypedAction, TypedReducer} from "redoodle";
import {IAbstractTileInformation, IAbstractTileInformationResourceInformation, IBoardState} from "../types";

export const PlaceTile = TypedAction.define("@@board/place")<{
  abstractTile: IAbstractTileInformation;
  x: number;
  y: number;
}>();

export const SetEmptyTile = TypedAction.define("@@board/setempty")<{
  x: number;
  y: number;
  asset: string;
  resources?: IAbstractTileInformationResourceInformation[];
}>();

export const SetBorderTile = TypedAction.define("@@board/setborder")<{
  x: number;
  y: number;
  asset: string;
}>();

export const HoverOverTile = TypedAction.define("@@board/hover")<{
  x?: number;
  y?: number;
}>();

export const SelectTile = TypedAction.define("@@board/select")<{
  x?: number;
  y?: number;
}>();

export const ResetBoard = TypedAction.define("@@board/reset")<{}>();

const reducer = TypedReducer.builder<IBoardState>()
  .withHandler(PlaceTile.TYPE, (state, { abstractTile, x, y }) => setWith(state, {
    tiles: [
      ...state.tiles.filter(tile => !(tile.x === x && tile.y === y)),
      { type: 'placed', abstractTile, x, y }
    ]
  }))
  .withHandler(SetEmptyTile.TYPE, (state, { x, y, asset, resources }) => setWith(state, {
    tiles: [
      ...state.tiles.filter(tile => !(tile.x === x && tile.y === y)),
      { type: 'empty', x, y, asset, resources: resources || [] }
      ]
  }))
  .withHandler(SetBorderTile.TYPE, (state, { x, y, asset }) => setWith(state, {
    tiles: [
      ...state.tiles.filter(tile => !(tile.x === x && tile.y === y)),
      { type: 'border', x, y, asset, resources: [] }
      ]
  }))
  .withHandler(HoverOverTile.TYPE, (state, { x, y }) => {
    if (x === undefined && y === undefined) {
      return setWith(state, {
        tiles: state.tiles.map(t => t.isHovering ? { ...t, isHovering: undefined } : t)
      });
    } else {
      return setWith(state, {
        tiles: state.tiles.map(t => t.x === x && t.y === y ? { ...t, isHovering: true } : { ...t, isHovering: undefined })
      });
    }
  })
  .withHandler(SelectTile.TYPE, (state, { x, y }) => {
    if (!x && !y) {
      return setWith(state, {
        tiles: state.tiles.map(t => t.isSelected ? { ...t, isSelected: undefined } : t)
      });
    } else {
      return setWith(state, {
        tiles: state.tiles.map(t => t.x === x && t.y === y ? { ...t, isSelected: true } : t)
      });
    }
  })
  .withHandler(ResetBoard.TYPE, (state) => setWith(state, { tiles: [] }))
  .build();

export default reducer;