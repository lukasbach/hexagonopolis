import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {Message} from "../commonui/Message";
import {IDialogMessage, IReduxState} from "../../types";
import {useEffect, useState} from "react";
import {useDispatch, useMappedState} from "redux-react-hook";
import {
  getCurrentDialogMessage,
  getPostDialogIndex,
  getPreDialogIndex,
  isPostDialogFinished,
  isPreDialogFinished
} from "../../state/filters";
import {NextDialogMessage} from "../../state/dialogProgress";

const styles = StyleSheet.create({

});

export const LevelDialog: React.FC<{
  preDialog: IDialogMessage[];
  postDialog: IDialogMessage[];
}> = props => {
  const dispatch = useDispatch();

  const {
    preDialogIndex, postDialogIndex, preDialogFinished, postDialogFinished, nextMessage, gameMode
  } = useMappedState((state: IReduxState) => ({
    preDialogIndex: getPreDialogIndex(state),
    postDialogIndex: getPostDialogIndex(state),
    preDialogFinished: isPreDialogFinished(state),
    postDialogFinished: isPostDialogFinished(state),
    nextMessage: getCurrentDialogMessage(state),
    gameMode: state.level ? state.level.gamemode : 'cityfill'
  }));

  useEffect(() => {
    if (nextMessage) {
      setTimeout(() => {
        dispatch(NextDialogMessage.create({}));
      }, nextMessage.message.length * 70);
    }
  }, [preDialogIndex])

  return (
    <>
      {
        (props.preDialog || [])
          // .filter((m, i) => i <= preDialogIndex)
          .map((msg, i) => (
            <Message
              side={msg.side === 0 ? "left" : msg.side === 2 ? "right" : undefined}
              title={msg.talkerName}
              avatarAsset={msg.talkerAsset}
              entryAnimation={i === preDialogIndex}
            >
              { msg.message }
            </Message>
          ))
      }

      <Message>
        {
          gameMode === 'cityfill' ? 'Complete the level by filling every available spot on the map!'
            : gameMode === 'emptycards' ? 'Complete the level by placing all your cards!'
              : gameMode === 'sandbox' ? 'Have fun!'
              : ''
        }

      </Message>
    </>
  )
};
