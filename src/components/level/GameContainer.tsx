import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {TileBoardContainer} from "../commonui/TileBoardContainer";
import {BottomBar} from "./BottomBar";
import {useMappedState} from "redux-react-hook";
import {useBackgroundColor, useUrlRouting} from "../../hooks";
import {RightBar} from "./RightBar";
import {useState} from "react";
import {BoardTile} from "./BoardTile";
import {IReduxState} from "../../types";
import {getBoardTiles} from "../../state/filters";

const styles = StyleSheet.create({
  verticalSplitContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  horizontalSplitContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    overflow: 'hidden'
  }

});

export const GameContainer: React.FC<{}> = props => {
  const backgroundColor = useBackgroundColor();
  const [isDragging, setIsDragging] = useState(false);
  const { boardTiles, centering, levelId } = useMappedState((state: IReduxState) => ({
    boardTiles: getBoardTiles(state),
    centering: state.level && state.level.centering,
    levelId: state.level && state.level.id
  }));
  useUrlRouting({ levelId });

  return (
    <div className={css(styles.verticalSplitContainer)}>
      <div
        className={css(styles.horizontalSplitContainer)}
      >
        <TileBoardContainer
          isDragging={setIsDragging}
          backgroundColor={backgroundColor}
          initialCentering={centering || [3, 3]}
        >
          {
            boardTiles.map(tile => (
              <BoardTile tile={tile} key={`${tile.x}-${tile.y}`} noHoverEvent={isDragging}/>
            ))
          }
        </TileBoardContainer>
        <RightBar />
      </div>

      <BottomBar />
    </div>
  )
};
