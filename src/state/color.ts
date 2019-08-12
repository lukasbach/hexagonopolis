import {TypedAction, TypedReducer} from "redoodle";

export const SetPrimaryColor = TypedAction.define("@@color/set")<{
  color: string;
}>();

const reducer = TypedReducer.builder<string>()
  .withHandler(SetPrimaryColor.TYPE, (state, { color }) => color)
  .build();

export default reducer;