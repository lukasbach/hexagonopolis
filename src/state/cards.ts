import {setWith, TypedAction, TypedReducer} from "redoodle";
import {ICardsState} from "../types";

export const SetDeck = TypedAction.define("@@cards/setdeck")<{
  cards: string[];
}>();

export const TakeCardFromDeck = TypedAction.define("@@cards/takeFromDeck")<{
  count?: number;
}>();

export const AddCard = TypedAction.define("@@cards/add")<{
  abstractTileId: string;
}>();

export const RemoveCard = TypedAction.define("@@cards/remove")<{
  abstractTileId: string;
}>();

export const RemoveCardFromIndex = TypedAction.define("@@cards/removeFromIndex")<{
  cardIndex: number;
}>();

export const SelectCard = TypedAction.define("@@cards/select")<{
  cardIndex?: number;
}>();

export const ResetCards = TypedAction.define("@@cards/reset")<{}>();


const reducer = TypedReducer.builder<ICardsState>()
  .withHandler(AddCard.TYPE, (state, { abstractTileId }) =>
    setWith(state, { hand: [...state.hand, abstractTileId] }))
  .withHandler(RemoveCard.TYPE, (state, { abstractTileId }) =>
    setWith(state, { hand: state.hand.filter(i => i !== abstractTileId) }))
  .withHandler(RemoveCardFromIndex.TYPE, (state, { cardIndex }) => {
    const tileIds = [...state.hand];
    tileIds.splice(cardIndex, 1);

    return setWith(state, { hand: tileIds });
  })
  .withHandler(SelectCard.TYPE, (state, { cardIndex }) =>
    setWith(state, { selectedIndex: cardIndex }))
  .withHandler(SetDeck.TYPE, (state, { cards }) => setWith(state, { deck: cards }))
  .withHandler(TakeCardFromDeck.TYPE, (state, { count }) => {
    const takenCards = [];

    for (let i = 0; i < (count || 1); i++) {
      takenCards.push(state.deck[Math.floor(Math.random() * state.deck.length)]);
    }

    return setWith(state, { hand: [...state.hand, ...takenCards] });
  })
  .withHandler(ResetCards.TYPE, (state, {}) => setWith(state, { hand: [], deck: [] }))
  .build();

export default reducer;