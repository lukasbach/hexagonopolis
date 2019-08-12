import {
  IAbstractTileInformation,
  IAbstractTileInformationResourceInformation,
  IResource,
  ResourceMetricIntent
} from "../types";

/**
 *
 * @param allResources defined for the entire game.
 * @param tileResources
 * @param card
 * @returns list of resource IDs from resources that the tile does not have enough to satisfy the cards requirements.
 * @returns an empty array if the tile satisfies the cards requirements.
 */
export const testRequirements = (
  allResources: IResource[],
  tileResources: IAbstractTileInformationResourceInformation[],
  card: IAbstractTileInformation
): string[] => {
  const insufficientResourceIds: string[] = [];

  const getResourceMetricFromTile = (resourceId: string): IAbstractTileInformationResourceInformation => {
    let result = tileResources.find(tr => tr.resourceId === resourceId);

    if (!!result) {
      return result;
    } else {
      let result = allResources.find(tr => tr.id === resourceId);

      if (!!result) {
        return { resourceId, amount: result.defaultValue || 0 };
      } else {
        throw Error(`Could not find resource with ID ${resourceId}.`);
      }
    }
  };

  for (let resourceRequirement of card.requirements) {
    const { amount } = getResourceMetricFromTile(resourceRequirement.resourceId);
    if ( (resourceRequirement.min !== undefined && resourceRequirement.min > amount)
      || (resourceRequirement.max !== undefined && resourceRequirement.max < amount) ) {
      insufficientResourceIds.push(resourceRequirement.resourceId);
    }
  }

  return insufficientResourceIds;
};
