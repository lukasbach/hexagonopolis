import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {usePrimaryColor} from "../../hooks";
import Color from "color";

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: '10px',
    borderRadius: '8px'
  },
  containerLeft: {
    margin: '5px 5px 15px 40px',
    paddingRight: '50px',
    textAlign: 'right'
  },
  containerRight: {
    margin: '5px 40px 15px 5px',
    paddingLeft: '50px',
    textAlign: 'left'
  },
  containerCenter: {
    margin: '15px 15px 25px 15px',
    textAlign: 'center'
  },
  avatar: {
    position: 'absolute',
    top: '10px',
    width: '32px'
  },
  avatarLeft: {
    right: '10px'
  },
  avatarRight: {
    left: '10px'
  },
  personName: {
    marginTop: '-25px',
    fontSize: '1.2em',
    color: '#fff',
    textShadow: '2px 2px 1px black',
    fontFamily: '"Pacifico", cursive',
  }
});

export const Message: React.FC<{
  avatarAsset?: string;
  title?: string;
  backgroundColor?: string;
  side?: 'left' | 'right';
  entryAnimation?: boolean;
}> = props => {
  const primaryColor = usePrimaryColor();
  const color = props.backgroundColor || primaryColor;

  const shade = (ratio: number) => Color(color).lighten(ratio).string();

  return (
    <div
      className={[
        css(
          styles.container,
          props.side === "left" && styles.containerLeft,
          props.side === "right" && styles.containerRight,
          !props.side && styles.containerCenter
        ),
        // props.side === 'left' && props.entryAnimation ? 'animated bounceInRight' : '',
        // props.side === 'right' && props.entryAnimation ? 'animated bounceInLeft' : '',
      ].join(' ')}
      style={{
        backgroundColor: shade(.3),
        color: shade(-.6),
        boxShadow: `3px 6px 1px ${shade(-.2)}`
      }}
    >
      {
        props.avatarAsset && (
          <img
            src={`./assets/avatars/${props.avatarAsset}.png`}
            alt={props.title}
            className={css(
              styles.avatar,
              props.side === "left" && styles.avatarLeft,
              props.side === "right" && styles.avatarRight
            )}
          />
        )
      }

      {
        props.title && (
          <div className={css(styles.personName)}>
            { props.title }
            { props.avatarAsset && ':' }
          </div>
        )
      }

      { props.children }
    </div>
  )
};
