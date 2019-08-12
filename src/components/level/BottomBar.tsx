import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {BottomBarCard} from "./BottomBarCard";
import {useCallback, useContext} from "react";
import {useDispatch, useMappedState} from "redux-react-hook";
import {IAbstractTileInformation, IReduxState} from "../../types";
import {getCards} from "../../state/filters";
import {SelectCard} from "../../state/cards";
import {useCheckWin, usePrimaryColor} from "../../hooks";
import {EmphasizedText} from "../commonui/EmphasizedText";
import {Message} from "../commonui/Message";
import {LoadLevel} from "../../state/level";

const styles = StyleSheet.create({
  container: {
    /*position: 'fixed',
    bottom: 0,
    left: 0,*/
    width: '100%',
    height: '240px',
    minHeight: '240px'
  },
  winContainer: {
    textAlign: 'center',
    margin: '2.4em'
  },
  winBackLink: {
    display: 'inline-block',
    paddingBottom: '10px',
    borderBottom: '8px solid #fff',
    transition: 'all .15s ease',
    cursor: 'pointer',

    ':hover': {
      paddingBottom: '4px'
    }
  }
});

export const BottomBar: React.FC<{}> = props => {
  const { cards } = useMappedState((state: IReduxState) => ({
    cards: getCards(state)
  }));
  const dispatch = useDispatch();
  const selectCard = (cardIndex: number) => dispatch(SelectCard.create({ cardIndex }));
  const backgroundColor = usePrimaryColor();
  const hasWon = useCheckWin();
  const onBack = () => dispatch(LoadLevel.create({}));

  const cardsReduced = (() => {
    const reduced: Array<{ card: IAbstractTileInformation, count: number, idx: number }> = [];

    for (let i = 0; i < cards.length; i++) {
      if (i >= 1 && cards[i - 1].id === cards[i].id) {
        reduced[reduced.length - 1].count++;
      } else {
        reduced.push({ card: cards[i], count: 1, idx: i });
      }
    }

    return reduced;
  });

  return (
    <div className={css(styles.container)} style={{ backgroundColor }}>

      {
        hasWon
          ? (
            <div className={css(styles.winContainer)}>
              <p>
                <EmphasizedText fontSize={6} text={'Level complete!'}/>
              </p>
              <div className={css(styles.winBackLink)} onClick={onBack}>
                <EmphasizedText fontSize={3} text={'Back to Campaign'}/>
              </div>
            </div>
          ) : (
            cardsReduced().map((card, index) => (
              <BottomBarCard tile={card.card} onSelect={() => selectCard(card.idx)} isSelected={!!card.card.isCardSelected} cardCount={card.count} />
            ))
          )
      }
    </div>
  )
};
