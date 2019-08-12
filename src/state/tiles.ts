import {setWith, TypedAction, TypedReducer} from "redoodle";
import {IAbstractTileInformation} from "../types";

export const DefineAbstractTile = TypedAction.define("@@tiles/define")<{
  abstractTile: IAbstractTileInformation;
}>();

export const ResetAbstractTileDefinitions = TypedAction.define("@@tiles/reset")<{}>();

const reducer = TypedReducer.builder<IAbstractTileInformation[]>()
  .withHandler(DefineAbstractTile.TYPE, (state, { abstractTile }) => [...state, abstractTile])
  .withHandler(ResetAbstractTileDefinitions.TYPE, () => [])
  .build();

export default reducer;