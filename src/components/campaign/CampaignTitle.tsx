import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {IReduxState} from "../../types";
import {EmphasizedText} from "../commonui/EmphasizedText";
import {useDispatch, useMappedState} from "redux-react-hook";
import {Button} from "../commonui/Button";
import {LeaveCampaign} from "../../state/campaign";

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    margin: '60px 0',
    zIndex: 800,
    display: 'flex',
    width: '100%'
  },
  heading: {
    flexGrow: 1,
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  title: {
    marginBottom: '12px'
  },
  subTitle: {},
  rightNotes: {
    width: '200px',
    textAlign: 'right',
    padding: '40px 100px 0 0'
  },
  backButton: {
    width: '100px',
    padding: '0 50px 0 100px'
  }
});

export const CampaignTitle: React.FC<{}> = props => {
  const dispatch = useDispatch();
  const {campaign} = useMappedState((state: IReduxState) => ({
    campaign: state.campaign
  }));
  const onBack = () => dispatch(LeaveCampaign.create({}));

  if (!campaign) {
    return null;
  }

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.backButton)}>
        <Button onClick={onBack} color={'#aaa'}>
          Back to&nbsp;Menu
        </Button>
      </div>
      <div className={css(styles.heading)}>
        <div className={css(styles.subTitle)}>
          <EmphasizedText fontSize={1.2} color={'#fff'}>
            By { campaign.author.name }
          </EmphasizedText>
        </div>
        <div className={css(styles.title)}>
          <EmphasizedText fontSize={4}>
            { campaign.name }
          </EmphasizedText>
        </div>
      </div>
      <div className={css(styles.rightNotes)}>
        <EmphasizedText fontSize={1.5} color={'#fff'}>
          Scroll by holding rightclick
        </EmphasizedText>
      </div>
    </div>
  )
};
