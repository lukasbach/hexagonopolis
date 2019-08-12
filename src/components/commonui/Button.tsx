import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {usePrimaryColor} from "../../hooks";
import Color from 'color';
import {useState} from "react";

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'inline-block',
    position: 'relative',
    margin: '10px'
  },
  buttonContainerSmall: {
    margin: '3px'
  },
  pseudoButton: {
    padding: '.5em .7em',
    borderRadius: '1em',
    fontSize: '1.2em',
    opacity: 0,
    zIndex: -1,
    fontFamily: '"Pacifico", cursive'
  },
  button: {
    position: 'absolute',
    top: 0,
    left: 0,
    border: 0,
    padding: '.5em .7em',
    borderRadius: '1em',
    fontSize: '1.2em',
    textShadow: '2px 2px 1px black',
    fontFamily: '"Pacifico", cursive',
    cursor: 'pointer',
    transition: 'all .1s ease',

    ':active': {
      // margin: '16px 7px 4px 13px',
      marginTop: '6px',
      marginBottom: '-6px',
      boxShadow: '0px 0px 1px black',
      transition: 'none',
    },

    ':focus': {
      outline: 'none'
    }
  },
  buttonHovering: {

  },
  buttonSmall: {
    padding: '.3em .5em',
    margin: '6px',
    borderRadius: '.5em',
    fontSize: '1em',
  }
});

export const Button: React.FC<{
  color?: string;
  fill?: boolean;
  onClick?: () => void;
  small?: boolean;
}> = props => {
  const [isHovering, setIsHovering] = useState(false);
  const primaryColor = usePrimaryColor();
  const color = props.color || primaryColor;

  const shade = (ratio: number) => Color(color).lighten(ratio).string();

  const backgroundColor = shade(isHovering ? -.4 : -.2);
  const textColor = shade(isHovering ? .3 : .6);

  return (
    <div className={css(styles.buttonContainer, props.small && styles.buttonContainerSmall)}>
      <div className={css(styles.pseudoButton)}>
        { props.children }
      </div>
      <button
        className={css(
          styles.button,
          isHovering && styles.buttonHovering,
          props.small && styles.buttonSmall
        )}
        style={{ backgroundColor, color: textColor, boxShadow: `3px 6px 1px ${shade(-.6)}` }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={props.onClick || (() => {})}
      >
        { props.children }
      </button>
    </div>
  )
};
