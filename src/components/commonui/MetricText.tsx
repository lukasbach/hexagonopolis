import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {AssetService} from "../../utils/AssetService";
import {
  IAbstractTileInformationResourceInformation,
  IAbstractTileInformationResourceRequirement,
  IReduxState, ResourceMetricIntent
} from "../../types";
import {useMappedState} from "redux-react-hook";
import {getResource} from "../../state/filters";

const styles = StyleSheet.create({
  container: {
    lineHeight: '20px',
    fontWeight: 'bold'
  },
  imageContainer: {
    display: 'inline-block',
    width: '30px',
    textAlign: 'center'
  },
  image: {
    height: '20px',
    verticalAlign: 'middle'
  },
  metricName: {
    marginRight: '4px'
  },
  metricValue: {
    /*display: 'inline-block',
    width: '25px',
    textAlign: 'right'*/
  },
  positiveIntent: {
    color: '#2ecc71'
  },
  negativeIntent: {
    color: '#e74c3c'
  }
});

export const MetricText: React.FC<{
  resourceInformation: IAbstractTileInformationResourceInformation | IAbstractTileInformationResourceRequirement;
  textColor?: string;
  inTile?: boolean;
  intent?: ResourceMetricIntent;
  longText?: boolean;
}> = props => {
  const { resource } = useMappedState((state: IReduxState) => ({
    resource: getResource(state, props.resourceInformation.resourceId)
  }));

  const amount = (() => {
    if ((props.resourceInformation as IAbstractTileInformationResourceInformation).amount !== undefined) {
      const amount = (props.resourceInformation as IAbstractTileInformationResourceInformation).amount;

      return (amount < 0 ? '-' : '+') + Math.abs(amount);
    } else {
      const asReq = props.resourceInformation as IAbstractTileInformationResourceRequirement;
      if (asReq.min !== undefined && asReq.max !== undefined) {
        return `${asReq.min} - ${asReq.max}`;
      } else if (asReq.min !== undefined) {
        return `${asReq.min}${props.longText ? ' or more' : '+'}`;
      } else if (asReq.max !== undefined) {
        return `${asReq.max}${props.longText ? ' or less' : '-'}`;
      } else {
        throw Error(`No resource amount information supplied in resource requirements: ${JSON.stringify(asReq)}`);
      }
    }
  })();

  const textColor = (() => {
    switch (props.intent) {
      case ResourceMetricIntent.DEFAULT:
        return props.textColor;
      case ResourceMetricIntent.TO_LOW_COUNT:
        return '#e74c3c';
      case ResourceMetricIntent.SUFFICIENT:
        return props.textColor; // '#2ecc71';
      default:
        return props.textColor
    }
  })();

  return (
    <div
      className={css(
        styles.container,
        /*props.metricIntent > 0 && styles.positiveIntent,
        props.metricIntent < 0 && styles.negativeIntent*/
      )}
      style={{ color: textColor }}
      title={resource.name}
    >
      <div className={css(styles.imageContainer)}>
        <img
          src={AssetService.getObjectUrl(resource.assetName)}
          className={css(styles.image)}
          alt={'Resource icon'}
        />
      </div>
      <span className={css(styles.metricValue)}>
        { props.longText && resource.name + ': ' }
        { /*props.metricIntent > 0 && '+' }
        { props.metricIntent < 0 && '-'*/ }
        { amount }
      </span>
    </div>
  )
};
