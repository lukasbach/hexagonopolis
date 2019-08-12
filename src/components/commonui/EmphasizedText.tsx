import * as React from "react";
import {StyleSheet, css} from "aphrodite";

const styles = StyleSheet.create({
  text: {
    // fontSize: '1.2em',
    textShadow: '2px 2px 1px black',
    fontFamily: '"Pacifico", cursive',
    lineHeight: '.8em'
  },
  bigText: {
    textShadow: '2px 6px 1px black',
  }
});

export const EmphasizedText: React.FC<{
  text?: string;
  color?: string;
  fontSize?: number;
  lineHeight?: number;
}> = props => {
  return (
    <span
      className={css(styles.text, (props.fontSize || 1) > 2 && styles.bigText)}
      style={{
        color: props.color || '#fff',
        fontSize: `${props.fontSize || 1}em`,
      }}
    >
      { props.children }
      { props.text }
    </span>
  )
};
