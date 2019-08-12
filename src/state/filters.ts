import {
  IAbstractTileInformation, IAbstractTileInformationResourceInformation,
  IReduxState,
  IResource,
  ISpecificEmptyTile,
  ISpecificPlacedTile,
  ISpecificTile
} from "../types";
import {HexagonPositioningService} from "../utils/HexagonPositioningService";

export const getCards = (state: IReduxState): IAbstractTileInformation[] => {
  return state.cards.hand
    .map(id => [...state.tiles, ...(state.level ? (state.level!.extraTiles || []) : [])].find(r => r.id === id))
    .map(card => !card ? (() => { console.log(state.cards.hand); throw Error(`Tile not found`);  })() : card!)
    .map((card, idx) => idx === state.cards.selectedIndex ? { ...card, isCardSelected: true } : card);
};

export const getSelectedCard = (state: IReduxState): IAbstractTileInformation | undefined => {
  return getCards(state).filter(card => card.isCardSelected)[0];
};

export const getResource = (state: IReduxState, resourceId: string): IResource => {
  const resource = state.resources.find(r => r.id === resourceId);

  if (!resource) {
    throw Error(`Could not find resource with ID ${resourceId}, registered resources`
      + ` are ${state.resources.map(r => r.id).join(', ')}`);
  }

  return resource;
};

export const getHoveredTile = (state: IReduxState): ISpecificTile | undefined => {
  return state.board.tiles.find(t => t.isHovering);
};

export const getBoardTile = (state: IReduxState, x: number, y: number): ISpecificTile | undefined => {
  return state.board.tiles.find(tile => tile.x === x && tile.y === y);
};

export const getBoardTiles = (state: IReduxState) => {
  const tiles = state.board.tiles.map(tile => {
    if (tile.type === "empty") {
      const resources = HexagonPositioningService
        .getNeighbourHexagonsCoordinates(tile.x, tile.y)
        .map(({x, y}) => getBoardTile(state, x, y))
        .filter(tile => tile && tile.type === "placed")
        .map(tile => tile as ISpecificPlacedTile)
        .map(tile => tile.abstractTile.grants)
        .reduce((a, b) => [...a, ...b], [])
        .reduce<IAbstractTileInformationResourceInformation[]>(((resources, nextResource) => {
          if (resources.find(r => r.resourceId === nextResource.resourceId)) {
            return resources.map(r =>
              r.resourceId === nextResource.resourceId
                ? { ...r, amount: r.amount + nextResource.amount }
                : r
            );
          } else {
            return [...resources, nextResource];
          }
        }), []);
      tile.resources = resources;
    }

    return tile;
  });

  return tiles;
};

export const getCurrentDialogMessage = (state: IReduxState) => {
  return !state.level
    ? undefined
    : (state.level.predialog || []).length > state.dialogProgress
      ? (state.level.predialog || [])[state.dialogProgress]
      : (state.level.postdialog || []).length > state.dialogProgress - (state.level.predialog || []).length
        ? (state.level.postdialog || [])[state.dialogProgress - (state.level.predialog || []).length]
        : undefined;
};

export const getPreDialogIndex = (state: IReduxState) => {
  return Math.min(state.dialogProgress, !state.level ? 0 : (state.level.predialog || []).length - 1);
};

export const getPostDialogIndex = (state: IReduxState) => {
  return Math.min(
    state.dialogProgress - (!state.level ? [] : state.level.predialog || []).length,
    !state.level ? 0 : (state.level.postdialog || []).length - 1
  );
};

export const isPreDialogFinished = (state: IReduxState) => {
  return !state.level ? true : getPreDialogIndex(state) >= (state.level.predialog || []).length - 1;
};

export const isPostDialogFinished = (state: IReduxState) => {
  return !state.level ? true : getPostDialogIndex(state) >= (state.level.postdialog || []).length - 1;
};


