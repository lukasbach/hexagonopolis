import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {TileBoardContainer} from "../commonui/TileBoardContainer";
import {Tile} from "../commonui/Tile";
import {loadLevel} from "../../utils/loadLevel";
import {EmphasizedText} from "../commonui/EmphasizedText";

const styles = StyleSheet.create({
  container: {
    width: '120%',
    height: '120%',
    position: 'fixed',
    top: -40,
    left: -40,
    zIndex: -1,
    backgroundColor: '#2ecc71'
  }
});

export const MenuBackground: React.FC<{}> = props => {
  const assets: string[] = [
    'tile5', // grass
    'tile10', 'tile13', // trees
    'tile14', 'tile15', // rocks
    'tile134', 'tile124', 'tile128', 'tile157', 'tile129' // buildings
  ];

  const board = [
    '00.3.1...0020...613....1905..10.',
    '..600..120....0217..20..2..460..',
    '.015...00...02...370..6.02...32.',
    '....11...107...10...17..71.0..1.',
    '..194..20..127....382.0...4..2..',
    '02...20...51..01..0..10..90.280.',
    '.80...10..20.2...6....2.3..0....',
    '...1704..200..19....12.0..15.123',

    '00.3.1...0020...613....1905..10.',
    '..600..120....0217..20..2..460..',
    '.015...00...02...370..6.02...32.',
    '....11...107...10...17..71.0..1.',
    '..194..20..127....382.0...4..2..',
    '02...20...51..01..0..10..90.280.',
    '.80...10..20.2...6....2.3..0....',
    '...1704..200..19....12.0..15.123',
  ];
  const tiles: Array<{ x: number, y: number, asset: string }> = [];

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const char = board[y].charAt(x);
      if (char !== '.') {
        tiles.push({ x, y, asset: assets[parseInt(char)] });
      }
    }
  }

  return (
    <div className={css(styles.container)}>
      {
        tiles.map(tile => (
          <Tile
            key={`${tile.x}-${tile.y}`}
            tile={{
              x: tile.x,
              y: tile.y,
              asset: tile.asset,
              type: 'empty',
              resources: []
            }}
            onClick={() => {}}
            onHover={() => {}}
            noOffset={true}
          />
        ))
      }
    </div>
  )
};
