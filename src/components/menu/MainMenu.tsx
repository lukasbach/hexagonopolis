import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {MainMenuButton} from "./MainMenuButton";
import {usePrimaryColor} from "../../hooks";
import {useDispatch} from "redux-react-hook";
import {LoadCampaign} from "../../state/campaign";
import {MenuBackground} from "./MenuBackground";
import Color from "color";
import {EmphasizedText} from "../commonui/EmphasizedText";

const styles = StyleSheet.create({
  outerContainer: {
    height: '100%',
    width: '100%',
    position: 'relative'
  },
  containerVerticalCentering: {
    height: '100%',
    width: '800px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  containerHorizontalCentering: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  innerContainer: {
  },
  twoButtonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  header: {
    textAlign: 'center',
    marginBottom: '8em'
  },
  footer: {
    position: 'absolute',
    bottom: '2em',
    left: 0,
    width: '100%',
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#fff',
    fontWeight: 'bold',
    textShadow: '2px 2px 1px black',
  },
  footerLink: {
    display: 'inline-block',
    textShadow: 'none',
    textDecoration: 'none',
    borderBottom: '3px solid #2c3e50',
    color: '#2c3e50',
    transition: 'all .1s ease',
    padding: '0 0 8px 0',
    lineHeight: '.8em',

    ':hover': {
      color: Color('#2c3e50').lighten(.6).string(),
      padding: '0 0 4px 0',
      marginBottom: '4px'
    },
    ':active': {
      color: '#fff'
    }
  }
});

const TwoButtonContainer: React.FC<{}> = props => (
  <div className={css(styles.twoButtonContainer)}>
    { props.children }
  </div>
);

export const MainMenu: React.FC<{}> = props => {
  const backgroundColor = usePrimaryColor();
  const dispatch = useDispatch();

  return (
    <div className={css(styles.outerContainer)}>
      <MenuBackground />
      <div className={css(styles.containerHorizontalCentering)}>
        <div className={css(styles.containerVerticalCentering)}>
          <div className={css(styles.innerContainer)}>
            <div className={css(styles.header)}>
              <EmphasizedText fontSize={8}>
                Hexagonopolis
              </EmphasizedText>
            </div>

            <MainMenuButton
              text={'Campaign'}
              color={backgroundColor || '#000'}
              asset={'tile4'}
              fill={true}
              onClick={() => dispatch(LoadCampaign.create({ campaignId: 'campaign-default' }))}
            />

            <MainMenuButton
              text={'Fill the City'}
              color={backgroundColor || '#000'}
              asset={'tile4'}
              fill={true}
              onClick={() => dispatch(LoadCampaign.create({ campaignId: 'campaign-mapfills' }))}
            />

            <TwoButtonContainer>
              <MainMenuButton text={'GitHub Repo'} color={backgroundColor || '#000'} asset={'tile4'} fill={true}/>
              <MainMenuButton text={'About'} color={backgroundColor || '#000'} asset={'tile4'} fill={true}/>
            </TwoButtonContainer>
          </div>
        </div>
      </div>

      <div className={css(styles.footer)}>
        Game developed by <a href={'https://lukasbach.com'} target={'_blank'} className={css(styles.footerLink)}>Lukas Bach</a>,
        Assets designed by <a href={'https://kenney.nl'} target={'_blank'} className={css(styles.footerLink)}>Kenney</a>.<br />
        Also check out <a href={'https://devsession.js.org'} target={'_blank'} className={css(styles.footerLink)}>DevSession</a>!
      </div>
    </div>
  )
};
