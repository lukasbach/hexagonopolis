import {setWith, TypedAction, TypedReducer} from "redoodle";

export const NextDialogMessage = TypedAction.define("@@dialogProgress/next")<{}>();

export const ResetDialogProgress = TypedAction.define("@@dialogProgress/reset")<{}>();

const reducer = TypedReducer.builder<number>()
  .withHandler(NextDialogMessage.TYPE, (state, {}) => state + 1)
  .withHandler(ResetDialogProgress.TYPE, (state, {}) => 0)
  .build();

export default reducer;