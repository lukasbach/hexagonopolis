export interface IReduxState {
  resources: IResource[];
  board: IBoardState;
  cards: ICardsState;
  tiles: IAbstractTileInformation[];
  color: string;
  level: ILevel | undefined;
  campaign: ICampaign | undefined;
  dialogProgress: number;
}

export interface IBoardState {
  tiles: ISpecificTile[];
}

export interface ICardsState {
  hand: string[];
  deck: string[];
  selectedIndex?: number;
}

export interface ISpecificTileMeta {
  x: number;
  y: number;
  isHovering?: boolean;
  isSelected?: boolean;
}

export interface ISpecificPlacedTile extends ISpecificTileMeta {
  type: 'placed';
  abstractTile: IAbstractTileInformation;
}

export interface ISpecificEmptyTile extends ISpecificTileMeta {
  type: 'empty' | 'border';
  asset: string;
  resources: IAbstractTileInformationResourceInformation[];
}

export type ISpecificTile = ISpecificPlacedTile | ISpecificEmptyTile;

export interface IAbstractTileInformation {
  id: string;
  name: string;
  description?: string;
  assetName: string;
  costs?: number;
  requirements: IAbstractTileInformationResourceRequirement[];
  grants: IAbstractTileInformationResourceInformation[];
  isCardSelected?: boolean;
}

export interface IAbstractTileInformationResourceRequirement {
  resourceId: string;
  min?: number;
  max?: number;
}

export interface IAbstractTileInformationResourceInformation {
  resourceId: string;
  amount: number;
}

export interface IResource {
  id: string;
  name: string;
  description?: string;
  assetName: string;
  isPositive: boolean;
  pointsMultiplier?: number;
  defaultValue?: number;
}

export enum ResourceMetricIntent {
  DEFAULT,
  TO_LOW_COUNT,
  SUFFICIENT
}

export enum AssetSize {
  x4,
  x3,
  x2,
  x1,
  x1dot5,
  x0dot75,
  x0dot5,
  svg
}

export interface ILevel {
  id: string;
  author: ILevelAuthor;
  name: string;
  iconAsset: string;
  gamemode: 'cityfill' | 'emptycards' | 'sandbox';
  tilemap: string[];
  tilemapLegend: {
    [key: string]:
        { type: 'empty', asset: string, resources?: IAbstractTileInformationResourceInformation[] }
      | { type: 'placed', tileId: string };
  };
  centering?: [number, number];
  extraTiles?: IAbstractTileInformation[];
  backgroundColor?: string;
  primaryColor?: string;
  cards: string[];
  predialog?: IDialogMessage[];
  postdialog?: IDialogMessage[];
}

export interface ILevelAuthor {
  name: string;
  website?: string;
  image?: string;
  repo?: string;
}

export interface IDialogMessage {
  talkerName: string;
  talkerAsset: string;
  message: string;
  side: 0 | 1 | 2;
}

export interface ICampaign {
  id: string;
  name: string;
  author: ILevelAuthor;
  backgroundColor?: string;
  tilemap: string[];
  tilemapLegend: {
    [key: string]: {
      asset: string;
      levelId: string;
      requires: string[];
    }
  };
  centering?: [number, number];
}
