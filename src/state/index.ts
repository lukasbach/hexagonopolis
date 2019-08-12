import {combineReducers, createStore} from "redoodle";
import {IReduxState} from "../types";
import {createLogger} from "redux-logger";
import {applyMiddleware} from "redux";
import resources from './resources';
import board from './board';
import cards from './cards';
import tiles from './tiles';
import color from './color';
import level from './level';
import campaign from './campaign';
import dialogProgress from './dialogProgress';

const reducer = combineReducers<IReduxState>({
  resources, board, cards, tiles, color, level, campaign, dialogProgress
});

const logger = (createLogger as any)({
  collapsed: true
});

const initialState: IReduxState = {
  resources: [],
  board: {
    tiles: []
  },
  cards: {
    hand: [],
    deck: []
  },
  tiles: [],
  color: '#34495e',
  level: undefined,
  campaign: undefined,
  dialogProgress: 0
};

export const store = createStore(
  reducer,
  initialState,
  (applyMiddleware as any)(logger)
);