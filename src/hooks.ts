import {useDispatch, useMappedState} from "redux-react-hook";
import {IReduxState} from "./types";
import {getBoardTile, getBoardTiles, getCards, getSelectedCard} from "./state/filters";
import {testRequirements} from "./utils/testRequirements";
import {RemoveCardFromIndex, TakeCardFromDeck} from "./state/cards";
import {PlaceTile} from "./state/board";
import {useEffect} from "react";
import UrlRoutingService from "./utils/UrlRoutingService";

export const usePrimaryColor = () => {
  return useMappedState((state: IReduxState) => ({
    color: state.color
  })).color;
};

export const useBackgroundColor = () => {
  return useMappedState((state: IReduxState) => ({
    color: state.level && state.level.backgroundColor
  })).color;
};

export const useBuyTile = (x: number, y: number): () => void => {
  const { card, allResources, tile, selectedCardIndex, gameMode } = useMappedState((state: IReduxState) => ({
    card: getSelectedCard(state),
    allResources: state.resources,
    tile: getBoardTile(state, x, y),
    selectedCardIndex: state.cards.selectedIndex,
    gameMode: state.level ? state.level.gamemode : 'emptycards'
  }));
  const dispatch = useDispatch();

  const canBuy = selectedCardIndex !== undefined && card && tile && tile.type === "empty"
    && testRequirements(allResources, tile.resources, card).length === 0;

  return () => {
    if (canBuy) {
      switch (gameMode) {
        case "cityfill":
          dispatch(RemoveCardFromIndex.create({ cardIndex: selectedCardIndex! }));
          dispatch(PlaceTile.create({ abstractTile: card!, x, y }));
          dispatch(RemoveCardFromIndex.create({ cardIndex: 0 }));
          dispatch(TakeCardFromDeck.create({ count: 2 }));
          break;
        case "emptycards":
          dispatch(RemoveCardFromIndex.create({ cardIndex: selectedCardIndex! }));
          dispatch(PlaceTile.create({ abstractTile: card!, x, y }));
          break;
        case "sandbox":
          dispatch(PlaceTile.create({ abstractTile: card!, x, y }));
          break;

      }
    }
  };
};

export const useUrlRouting = (options: {
  campaignId?: string;
  levelId?: string;
}) => {
  useEffect(() => {
    if (options.levelId && options.campaignId) {
      UrlRoutingService.setLevel(options.levelId, options.campaignId);
    } else if (options.campaignId) {
      UrlRoutingService.setCampaign(options.campaignId);
    } else if (options.levelId) {
      UrlRoutingService.setLevel(options.levelId);
    }
  }, [options.campaignId, options.levelId]);
};

export const useCheckWin = () => {
  const { gameMode, cards, tiles } = useMappedState((state: IReduxState) => ({
    gameMode: state.level ? state.level.gamemode : 'sandbox',
    cards: getCards(state),
    tiles: getBoardTiles(state)
  }));

  if (gameMode === "cityfill") {
    return tiles.map(tile => tile.type !== "empty").reduce((a, b) => a && b, true);
  } else if (gameMode === "emptycards") {
    return cards.length === 0;
  }
}
