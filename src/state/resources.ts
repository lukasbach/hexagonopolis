import {TypedAction, TypedReducer} from "redoodle";
import {IResource} from "../types";

export const DefineResource = TypedAction.define("@@resources/define")<{
  resource: IResource
}>();

export const ResetResourcesList = TypedAction.define("@@resources/reset")<{}>();

const reducer = TypedReducer.builder<IResource[]>()
  .withHandler(DefineResource.TYPE, (state, { resource }) => [...state, resource])
  .withHandler(ResetResourcesList.TYPE, () => [])
  .build();

export default reducer;