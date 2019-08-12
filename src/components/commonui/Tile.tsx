import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {HexagonPositioningService} from "../../utils/HexagonPositioningService";
import {useState} from "react";
import {useEffect} from "react";
import {HoverOverTile} from "../../state/board";
import {IAbstractTileInformationResourceInformation, ISpecificTile, ResourceMetricIntent} from "../../types";
import {AssetService} from "../../utils/AssetService";
import {MetricText} from "./MetricText";

const styles = StyleSheet.create({
  containerAbsolutePositioning: {
    position: 'absolute',
    zIndex: 450
  },
  containerNoAbsolutePositioning: {
    zIndex: 450
  },
  hitBoxes: {
    zIndex: 300,
    position: 'relative',
    /*':hover div': {
      borderLeft: '3px solid black',
      borderRight: '3px solid black'
    },*/
  },
  hitBox: {
    position: 'absolute',
    top: HexagonPositioningService.getUpperPartHeight(),
    width: HexagonPositioningService.getHitboxRectangleMetrics()[0],
    height: HexagonPositioningService.getHitboxRectangleMetrics()[1]
  },
  imageContainer: {
    position: 'relative'
  },
  image: {
    // width: '128px',
    position: 'absolute',
    zIndex: 180,
    transition: 'all .15s ease'
  },
  // imageHovered: {
  //   width: '116px',
  //   top: 6,
  //   left: 6
  // },
  textContainer: {
    // width: '128px',
    height: HexagonPositioningService.getHeight(128) + 'px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 200
  }
});

export const Tile: React.FC<{
  onHover: (isHovered: boolean) => void;
  onClick: () => void;
  tile: ISpecificTile;
  noAbsolutePositioning?: boolean;
  noOffset?: boolean;
  imageWidth?: number;
}> = props => {
  const imageWidth = props.imageWidth || 128;
  const hoveringSizeChange = 6;
  const [xPos, yPos] = HexagonPositioningService.getTilePositioning(props.tile.x, props.tile.y);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={css(props.noAbsolutePositioning ? styles.containerNoAbsolutePositioning
        : styles.containerAbsolutePositioning)}
      style={ props.noAbsolutePositioning ? {
        width: `${imageWidth}px`,
        height: `${HexagonPositioningService.getHeight(imageWidth)}px`,
        display: 'inline-block'
      } : {
        top: `${xPos + (props.noOffset ? 0 : 800)}px`,
        left: `${yPos + (props.noOffset ? 0 : 800)}px`
      }}
    >
      <div className={css(styles.hitBoxes)}>
        {
          [0 * 60, 1 * 60, 2 * 60].map((degree, index) => {
            return (
              <div
                key={index}
                className={css(styles.hitBox)}
                style={{
                  transform: `rotate(${degree}deg)`
                }}
                onMouseEnter={() => {
                  setIsHovering(true);
                  props.onHover(true);
                }}
                onMouseLeave={() => {
                  setIsHovering(false);
                  props.onHover(false);
                }}
                onClick={props.onClick}
              >
              </div>
            )
          })
        }
      </div>

      <div className={css(styles.imageContainer)}>
        <img
          src={AssetService.getTileUrl(
            props.tile.type === "placed"
              ? props.tile.abstractTile.assetName
              : props.tile.asset
          )}
          className={css(styles.image/*, isHovering && styles.imageHovered*/)}
          style={{
            width: !isHovering ? `${imageWidth}px` : `${imageWidth - 2 * hoveringSizeChange}px`,
            top: !isHovering ? 0 : `${hoveringSizeChange}px`,
            left: !isHovering ? 0 : `${hoveringSizeChange}px`,
          }}
        />

        <div
          className={css(styles.textContainer)}
          style={{ width: `${imageWidth}px` }}
        >
          { props.children }
        </div>
      </div>
    </div>
  );
};
