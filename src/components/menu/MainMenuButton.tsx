import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {EmphasizedText} from "../commonui/EmphasizedText";
import Color from "color";
import {useState} from "react";

const styles = StyleSheet.create({
  outerContainer: {
    margin: '15px 15px 0 15px',
    flexGrow: 1
  },
  buttonContainer: {
    position: 'relative',
    border: 0,
    padding: '40px 60px',
    borderRadius: '20px',
    transition: 'all .1s ease',
    outline: 'none',
    margin: '0 8px 14px 0',
    cursor: 'pointer',
    zIndex: 100,

    ':active': {
      margin: '14px 0 0 8px',
      boxShadow: 'none'
    }
  },
  buttonContainerHovering: {

  }
});

export const MainMenuButton: React.FC<{
  text: string;
  color: string;
  asset: string;
  fill?: boolean;
  onClick?: () => void;
}> = props => {
  const [isHovering, setIsHovering] = useState(false);

  const shade = (ratio: number) => Color(props.color).lighten(ratio).string();

  return (
    <div className={css(styles.outerContainer)}>
      <button
        className={css(styles.buttonContainer, isHovering && styles.buttonContainerHovering)}
        style={{
          backgroundColor: isHovering ? shade(0) : shade(.2),
          width: props.fill ? '100%' : undefined,
          boxShadow: `8px 14px 1px ${shade(-.6)}`
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={props.onClick || (() => {})}
      >
        <EmphasizedText text={props.text} fontSize={3} color={'#fff'}/>
      </button>
    </div>
  )
};
