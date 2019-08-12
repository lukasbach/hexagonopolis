import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {useDispatch, useMappedState} from "redux-react-hook";
import {IReduxState} from "../../types";
import {Button} from "../commonui/Button";
import {loadLevel} from "../../utils/loadLevel";
import {LoadLevel} from "../../state/level";
import {ResetCards} from "../../state/cards";
import {LevelDialog} from "./LevelDialog";
import {EmphasizedText} from "../commonui/EmphasizedText";

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  grow: {
    flexGrow: 1,
    paddingBottom: '50px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
  },
  footer: {
    marginBottom: '2em'
  },
  header: {
    margin: '2em 2em 0 2em'
  }
});

export const LevelInformation: React.FC<{}> = props => {
  const dispatch = useDispatch();
  const { level } = useMappedState((state: IReduxState) => ({
    level: state.level!
  }));

  const onLeaveLevel = () => {
    dispatch(ResetCards.create({}));
    dispatch(LoadLevel.create({}));
  };

  const onRestart = () => {
    dispatch(ResetCards.create({}));
    dispatch(LoadLevel.create({}));
    setTimeout(() => loadLevel(level, dispatch), 0);
  };

  if (!level) {
    return <span></span>;
  }

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.grow)}>
        {/*<h1 className={css(styles.header)}>{ level.name }</h1>*/}
        <div className={css(styles.header)}>
          <EmphasizedText text={level.name} fontSize={3} />
        </div>

        <Button onClick={onLeaveLevel}>Leave</Button>
        <Button onClick={onRestart}>Restart Level</Button>
        <br />

        <LevelDialog
          preDialog={level.predialog || []}
          postDialog={level.postdialog || []}
        />
      </div>
      {/*<div className={css(styles.footer)}>
        <Message title={'Level designed by'}>
          { level.author.name }<br />
          <Button small={true}>Website</Button>
          <Button small={true}>Repo</Button>
        </Message>
      </div>*/}
    </div>
  )
};
