import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {usePrimaryColor} from "../../hooks";
import {useMappedState} from "redux-react-hook";
import {IReduxState} from "../../types";
import {getHoveredTile} from "../../state/filters";
import {LevelInformation} from "./LevelInformation";
import {HoveredTileInformation} from "./HoveredTileInformation";

const styles = StyleSheet.create({
  container: {
    width: '400px'
  },
  tileContainer: {
    textAlign: 'center',
    height: '100%'
  }
});

export const RightBar: React.FC<{}> = props => {
  const backgroundColor = usePrimaryColor();
  const { hoveredTile } = useMappedState((state: IReduxState) => ({
    hoveredTile: getHoveredTile(state),
    all: state.board.tiles.filter(t => t.type === "placed")
  }));

  return (
    <div
      className={css(styles.container)}
      style={{ backgroundColor }}
    >
      <div
        className={css(styles.tileContainer)}
        style={{ backgroundColor }}
      >
        {
          hoveredTile ? (
            <HoveredTileInformation tile={hoveredTile}/>
          ) : (
            <LevelInformation/>
          )
        }
      </div>
    </div>
  )
};
