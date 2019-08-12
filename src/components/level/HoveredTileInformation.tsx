import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {Tile} from "../commonui/Tile";
import {Message} from "../commonui/Message";
import {MetricText} from "../commonui/MetricText";
import {ISpecificTile} from "../../types";

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    width: '100%',
    fontSize: '2.2em',
    marginTop: '-100px',
    zIndex: 500,
    color: '#fff',
    textShadow: '2px 2px 1px black',
    fontFamily: '"Pacifico", cursive',
    lineHeight: '1em'
  },
  titleContainer: {
    position: 'relative',
  }
});

export const HoveredTileInformation: React.FC<{
  tile: ISpecificTile
}> = props => {

  return (
    <div>
      <div style={{ zIndex: 100 }}>
        <Tile
          onHover={() => {}}
          onClick={() => {}}
          tile={props.tile}
          noAbsolutePositioning={true}
          imageWidth={256}
        />
      </div>

      {
        props.tile.type === "placed" && (
          <div>
            <div className={css(styles.titleContainer)}>
              <h1 className={css(styles.title)}>
                { props.tile.abstractTile.name }
              </h1>
            </div>

            { props.tile.abstractTile.description && (
              <Message>
                { props.tile.abstractTile.description }
              </Message>
            ) }

            <Message title={'Requires'}>
              {
                props.tile.abstractTile.requirements.map(r => (
                  <MetricText
                    key={r.resourceId}
                    resourceInformation={r}
                    longText={true}
                  />
                ))
              }
              { props.tile.abstractTile.requirements.length === 0 && 'Nothing' }
            </Message>

            <Message title={'Grants'}>
              {
                props.tile.abstractTile.grants.map(r => (
                  <MetricText
                    key={r.resourceId}
                    resourceInformation={r}
                    longText={true}
                  />
                ))
              }
              { props.tile.abstractTile.grants.length === 0 && 'Nothing' }
            </Message>
          </div>
        )
      }

      {
        props.tile.type === "empty" && (
          <div>
            <div className={css(styles.titleContainer)}>
              <h1 className={css(styles.title)}>
                Empty tile
              </h1>
            </div>

            <Message title={'Resources'}>
              {
                props.tile.resources.map(r => (
                  <MetricText
                    key={r.resourceId}
                    resourceInformation={r}
                    longText={true}
                  />
                ))
              }
              { props.tile.resources.length === 0 && 'This tile does not have any resources.' }
            </Message>
          </div>
        )
      }

    </div>
  )
};
