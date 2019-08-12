import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {IAbstractTileInformation, IReduxState} from "../../types";
import {AssetService} from "../../utils/AssetService";
import Color from 'color';
import {usePrimaryColor} from "../../hooks";
import {MetricText} from "../commonui/MetricText";
import {EmphasizedText} from "../commonui/EmphasizedText";

const sizes = {
  bottomBarHeight: 240,
  cardTopOffset: 30,
  cardIconTopOffset: 50,
  cardIconWidth: 120,
  cardWidth: 160,
  cardLeftMargin: 20,
  countTopOffset: 50
};

const px = (value: number) => `${value}px`;

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    position: 'relative',
    width: px(sizes.cardWidth),
    height: px(sizes.bottomBarHeight + sizes.cardTopOffset),
    marginLeft: px(sizes.cardLeftMargin),
    // marginTop: px(-sizes.cardTopOffset),
    textAlign: 'center',
    overflowX: 'visible',
  },
  innerContainer: {
    position: 'absolute',
    top: px(-sizes.cardTopOffset),
    bottom: 0,
    width: px(sizes.cardWidth),
    borderRadius: '40px 40px 0 0',
    zIndex: 500,
    transition: 'all .1s ease',

    ':hover': {
      top: px(-sizes.cardTopOffset - 20),
    }
  },
  innerContainerSelected: {
    top: px(-sizes.cardTopOffset - 25),

    ':hover': {
      top: px(-sizes.cardTopOffset - 25),
    }
  },
  countContainer: {
    position: 'absolute',
    top: px(-sizes.countTopOffset),
    right: 0,
    zIndex: 510
  },
  image: {
    width: px(sizes.cardIconWidth),
    marginTop: px(-sizes.cardIconTopOffset),
    zIndex: 500,
  },
  title: {
    margin: '0 20px',
    marginTop: '-40px',
    lineHeight: '1.1em',
  },
  resourceListTitle: {
    fontWeight: 'bold',
    fontSize: '1em',
    marginBottom: '.6em'
  },
  textContainer: {
    display: 'flex',
    width: px(sizes.cardWidth),
  },
  resourcesColumn: {
    flexGrow: 1,
    padding: '10px'
  }
});

export const BottomBarCard: React.FC<{
  tile: IAbstractTileInformation;
  onSelect: () => void;
  isSelected: boolean;
  cardCount: number;
}> = props => {
  const primaryColor = usePrimaryColor();
  const shadedColor = (ratio: number) => Color(primaryColor).darken(ratio).string();

  return (
    <div
      className={css(styles.container)}
    >
      {
        props.cardCount && props.cardCount > 1 && (
          <div className={css(styles.countContainer)}>
            <EmphasizedText fontSize={2.4} text={`${props.cardCount}x`}/>
          </div>
        )
      }

      <div
        className={css(styles.innerContainer, props.tile.isCardSelected && styles.innerContainerSelected)}
        style={{
          backgroundColor: props.tile.isCardSelected
            ? shadedColor(.2)
            : shadedColor(.1),
          cursor: !props.tile.isCardSelected ? 'pointer' : undefined,
          boxShadow: `7px 14px 1px ${Color(primaryColor).darken(.4).string()}`
        }}
        onClick={props.onSelect}
      >
        <img
          src={AssetService.getTileUrl(props.tile.assetName)}
          className={css(styles.image)}
        />

        <div
          className={css(styles.title)}
          style={{ color: shadedColor(.4) }}
        >
          <EmphasizedText text={props.tile.name} fontSize={1.4} />
        </div>

        <div className={css(styles.textContainer)}>
          <div className={css(styles.resourcesColumn)}>
            <div className={css(styles.resourceListTitle)} style={{ color: shadedColor(.65) }}>
              Requires
            </div>

            {
              props.tile.requirements.length === 0
                ? 'Nothing'
                : props.tile.requirements.map(r => (
                  <MetricText
                    key={r.resourceId}
                    resourceInformation={r}
                    textColor={shadedColor(.5)}
                  />
                ))
            }
          </div>
          <div className={css(styles.resourcesColumn)}>
            <div className={css(styles.resourceListTitle)} style={{ color: shadedColor(.65) }}>
              Grants
            </div>

            {
              props.tile.grants.length === 0
                ? 'Nothing'
                : props.tile.grants.map(r => (
                  <MetricText
                    key={r.resourceId}
                    resourceInformation={r}
                    textColor={shadedColor(.6)}
                  />
                ))
            }
          </div>
        </div>
      </div>
    </div>
  )
};
