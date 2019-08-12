import {TypedAction, TypedReducer} from "redoodle";
import {ILevel} from "../types";

export const LoadLevel = TypedAction.define("@@level/load")<{
  level?: ILevel
}>();

const reducer = TypedReducer.builder<ILevel | undefined>()
  .withHandler(LoadLevel.TYPE, (state, { level }) => level)
  .build();

export default reducer;