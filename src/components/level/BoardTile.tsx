import * as React from "react";
import {
  IAbstractTileInformationResourceInformation,
  IReduxState,
  ISpecificTile,
  ResourceMetricIntent
} from "../../types";
import {MetricText} from "../commonui/MetricText";
import {useDispatch, useMappedState} from "redux-react-hook";
import {getSelectedCard} from "../../state/filters";
import {testRequirements} from "../../utils/testRequirements";
import {useBuyTile} from "../../hooks";
import {HoverOverTile} from "../../state/board";
import {Tile} from "../commonui/Tile";


export const BoardTile: React.FC<{
  tile: ISpecificTile;
  noHoverEvent?: boolean;
}> = props => {
  const { selectedCard, allResources } = useMappedState((state: IReduxState) => ({
    selectedCard: getSelectedCard(state),
    allResources: state.resources
  }));
  const onBuy = useBuyTile(props.tile.x, props.tile.y);
  const dispatch = useDispatch();

  const onHover = (isHovering: boolean) => {
    if (isHovering) {
      dispatch(HoverOverTile.create({ x: props.tile.x, y: props.tile.y }));
    } else {
      dispatch(HoverOverTile.create({}));
    }
  }

  const insuffucientRequirements = props.tile.type === "empty" && selectedCard
    ? testRequirements(allResources, props.tile.resources, selectedCard) : [];

  return (
    <Tile
      onHover={props.noHoverEvent ? () => {} : onHover}
      onClick={onBuy}
      tile={props.tile}
    >
      {
        props.tile.type === "empty" && (
          [
            ...props.tile.resources,
            ...allResources                                                              // Add resources
              .filter(r => props.tile.type === "empty"                         // that are not on the tile
                && !props.tile.resources.find(r2 => r2.resourceId === r.id))
              .filter(r => insuffucientRequirements.find(i => i === r.id)) // but are insufficient
              .map<IAbstractTileInformationResourceInformation>(r => ({ resourceId: r.id, amount: r.defaultValue || 0 }))
          ].map(r => (
            <MetricText
              key={r.resourceId}
              resourceInformation={r}
              inTile={true}
              textColor={'#fff'}
              intent={insuffucientRequirements.includes(r.resourceId) ? ResourceMetricIntent.TO_LOW_COUNT : ResourceMetricIntent.SUFFICIENT}
            />
          ))
        )
      }
    </Tile>
  )
};