import {IAbstractTileInformation} from "../types";
import tiles from './tiles.json';

/*const oldtiles: IAbstractTileInformation[] = [
  {
    id: 'blocking_rock',
    name: 'Blocking Rock',
    description: 'Welp, I guess you can\'t build here!',
    assetName: 'tile14',
    requirements: [],
    grants: [],
    costs: 0
  },
  {
    id: 'blocking_rock_2',
    name: 'Blocking Rock',
    description: 'Welp, I guess you can\'t build here!',
    assetName: 'tile15',
    requirements: [],
    grants: [],
    costs: 0
  },
  {
    id: 'blocking_rock_3',
    name: 'Blocking Rock',
    description: 'Welp, I guess you can\'t build here!',
    assetName: 'tile16',
    requirements: [],
    grants: [],
    costs: 0
  },
  {
    id: 'joker',
    name: 'Starter Joker',
    assetName: 'tile92',
    requirements: [
    ],
    grants: [
      { resourceId: 'agriculture', amount: 5 },
      { resourceId: 'military', amount: 5 },
      { resourceId: 'social', amount: 5 },
      { resourceId: 'stone', amount: 5 },
      { resourceId: 'wood', amount: 5 },
    ],
    costs: 0
  },
  {
    id: 'farm_fields',
    name: 'Small Farm',
    assetName: 'tile124',
    requirements: [
      { resourceId: 'wood', min: 1 },
      { resourceId: 'social', min: 1 },
    ],
    grants: [
      { resourceId: 'agriculture', amount: 2 },
      { resourceId: 'relaxing', amount: 1 },
    ],
    costs: 0
  },
  {
    id: 'farm_smelt',
    name: 'Farm Smelt',
    assetName: 'tile128',
    requirements: [],
    grants: [],
    costs: 0
  },
  {
    id: 'farm_smith',
    name: 'Farm Smith',
    assetName: 'tile126',
    requirements: [],
    grants: [],
    costs: 0
  },
  {
    id: 'lumberjack',
    name: 'Lumberjack',
    assetName: 'tile129',
    requirements: [
      { resourceId: 'wood', min: 5 }
    ],
    grants: [
      { resourceId: 'wood', amount: 5 },
      { resourceId: 'agriculture', amount: 1 },
    ],
    costs: 0
  },
  {
    id: 'road_grass_stone',
    name: 'Stone Transportation Road',
    assetName: 'tile79',
    requirements: [
      { resourceId: 'stone', min: 2 }
    ],
    grants: [
      { resourceId: 'stone', amount: 2 }
    ],
    costs: 0
  },
  {
    id: 'road_grass_wood',
    name: 'Wood Transportation Road',
    assetName: 'tile79',
    requirements: [
      { resourceId: 'wood', min: 2 }
    ],
    grants: [
      { resourceId: 'wood', amount: 2 }
    ],
    costs: 0
  },
  {
    id: 'residential0',
    name: 'Residential Home',
    assetName: 'tile143',
    requirements: [
      { resourceId: 'noise', max: 2 },
      { resourceId: 'social', min: 2 },
    ],
    grants: [
      { resourceId: 'waste', amount: 2 },
    ],
    costs: 0
  },
  {
    id: 'residential1',
    name: 'Residential Home',
    assetName: 'tile144',
    requirements: [
      { resourceId: 'noise', max: 2 },
      { resourceId: 'social', min: 2 },
    ],
    grants: [
      { resourceId: 'waste', amount: 2 },
    ],
    costs: 0
  },
  {
    id: 'residential2',
    name: 'Residential Home',
    assetName: 'tile145',
    requirements: [
      { resourceId: 'noise', max: 2 },
      { resourceId: 'social', min: 2 },
    ],
    grants: [
      { resourceId: 'waste', amount: 2 },
    ],
    costs: 0
  },
  {
    id: 'residential3',
    name: 'Residential Home',
    assetName: 'tile146',
    requirements: [
      { resourceId: 'noise', max: 2 },
      { resourceId: 'social', min: 2 },
    ],
    grants: [
      { resourceId: 'waste', amount: 2 },
    ],
    costs: 0
  },
  {
    id: 'castle_small',
    name: 'Small Castle',
    assetName: 'tile133',
    requirements: [
      { resourceId: 'wood', min: 1 },
      { resourceId: 'military', max: 0 },
      { resourceId: 'waste', max: 0 },
    ],
    grants: [
      { resourceId: 'relaxing', amount: 2 },
      { resourceId: 'social', amount: 2 },
      { resourceId: 'sightseeing', amount: 1 },
    ],
    costs: 0
  },
  {
    id: 'castle_big',
    name: 'Large Castle',
    assetName: 'tile134',
    requirements: [
      { resourceId: 'stone', min: 1 },
      { resourceId: 'military', max: 0 },
      { resourceId: 'waste', max: 0 },
    ],
    grants: [
      { resourceId: 'relaxing', amount: 4 },
      { resourceId: 'social', amount: 3 },
      { resourceId: 'sightseeing', amount: 3 },
    ],
    costs: 0
  },
  {
    id: 'arc',
    name: 'Roman Triumphal Arc',
    assetName: 'tile158',
    requirements: [
      { resourceId: 'stone', min: 1 },
      { resourceId: 'military', max: 0 },
      { resourceId: 'wood', min: 1 },
    ],
    grants: [
      { resourceId: 'relaxing', amount: 2 },
      { resourceId: 'sightseeing', amount: 2 },
    ],
    costs: 0
  },
  {
    id: 'office_small',
    name: 'Small Office Building',
    description: 'Lots of people working there! Like almost a quarter of them!',
    assetName: 'tile103',
    requirements: [
      { resourceId: 'stone', min: 1 },
      { resourceId: 'military', min: 1 },
    ],
    grants: [
      { resourceId: 'noise', amount: 1 },
      { resourceId: 'social', amount: 2 },
      { resourceId: 'waste', amount: 1 },
    ],
    costs: 0
  },
  {
    id: 'office_medium',
    name: 'Medium Office Building',
    assetName: 'tile161',
    requirements: [
      { resourceId: 'stone', min: 2 },
      { resourceId: 'military', min: 1 },
    ],
    grants: [
      { resourceId: 'noise', amount: 2 },
      { resourceId: 'social', amount: 3 },
      { resourceId: 'waste', amount: 1 },
    ],
    costs: 0
  },
  {
    id: 'office_big',
    name: 'Large Office Building',
    assetName: 'tile162',
    requirements: [
      { resourceId: 'stone', min: 3 },
      { resourceId: 'military', min: 2 },
    ],
    grants: [
      { resourceId: 'noise', amount: 3 },
      { resourceId: 'social', amount: 2 },
      { resourceId: 'waste', amount: 3 },
    ],
    costs: 0
  },
  {
    id: 'shop0',
    name: 'Shop',
    assetName: 'tile147',
    requirements: [
      { resourceId: 'wood', min: 1 },
      { resourceId: 'agriculture', min: 1 },
    ],
    grants: [
      { resourceId: 'noise', amount: 1 },
      { resourceId: 'social', amount: 2 },
    ],
    costs: 0
  },
  {
    id: 'shop1',
    name: 'Shop',
    assetName: 'tile148',
    requirements: [
      { resourceId: 'wood', min: 1 },
      { resourceId: 'agriculture', min: 2 },
    ],
    grants: [
      { resourceId: 'noise', amount: 1 },
      { resourceId: 'social', amount: 2 },
    ],
    costs: 0
  },
  {
    id: 'shop2',
    name: 'Shop',
    assetName: 'tile149',
    requirements: [
      { resourceId: 'wood', min: 2 },
      { resourceId: 'social', min: 1 },
    ],
    grants: [
      { resourceId: 'noise', amount: 1 },
      { resourceId: 'social', amount: 3 },
    ],
    costs: 0
  },
  {
    id: 'waste_plant',
    name: 'Waste Incineration Plant',
    assetName: 'tile138',
    requirements: [
      { resourceId: 'waste', min: 3 },
    ],
    grants: [
      { resourceId: 'noise', amount: 2 },
      { resourceId: 'agriculture', amount: 2 },
      { resourceId: 'fuel', amount: 3 },
      { resourceId: 'waste', amount: -6 },
    ],
    costs: 0
  },
  {
    id: 'church',
    name: 'Church',
    assetName: 'tile157',
    requirements: [
      { resourceId: 'wood', min: 1 },
      { resourceId: 'social', min: 1 },
      { resourceId: 'military', max: 0 },
      { resourceId: 'noise', max: 2 },
    ],
    grants: [
      { resourceId: 'social', amount: 4 },
      { resourceId: 'relaxing', amount: 4 },
    ],
    costs: 0
  },
  {
    id: 'camping',
    name: 'Camping place',
    assetName: 'tile159',
    requirements: [
      { resourceId: 'wood', min: 2 },
      { resourceId: 'noise', min: 0 },
      { resourceId: 'relaxing', min: 3 }
    ],
    grants: [
      { resourceId: 'social', amount: 3 },
      { resourceId: 'wood', amount: 1 },
    ],
    costs: 0
  },
  {
    id: 'mine',
    name: 'Mining Shaft',
    assetName: 'tile160',
    requirements: [],
    grants: [],
    costs: 0
  },
  {
    id: 'fountain',
    name: 'Water Fountain',
    assetName: 'tile93',
    requirements: [],
    grants: [],
    costs: 0
  },
  {
    id: 'parking',
    name: 'Parking Lot',
    assetName: 'tile95',
    requirements: [],
    grants: [],
    costs: 0
  },
  {
    id: 'trees_grass',
    name: 'Forest',
    assetName: 'tile12',
    requirements: [],
    grants: [
      { resourceId: 'wood', amount: 2 }
    ],
    costs: 0
  },
  {
    id: 'trees_dirt',
    name: 'Forest',
    assetName: 'tile34',
    requirements: [],
    grants: [
      { resourceId: 'wood', amount: 2 }
    ],
    costs: 0
  },
  {
    id: 'trees_sand',
    name: 'Forest',
    assetName: 'tile56',
    requirements: [],
    grants: [
      { resourceId: 'wood', amount: 2 }
    ],
    costs: 0
  },
  {
    id: 'military_hangar',
    name: 'Military Hangar',
    assetName: 'tile97',
    requirements: [],
    grants: [],
    costs: 0
  },
  {
    id: 'military_tanks',
    name: 'Military Outpost',
    assetName: 'tile98',
    requirements: [],
    grants: [],
    costs: 0
  },
  {
    id: 'military_rockets',
    name: 'Rockets Launch Site',
    assetName: 'tile99',
    requirements: [],
    grants: [],
    costs: 0
  },
  {
    id: 'military_turret_small',
    name: 'Small Turret',
    assetName: 'tile100',
    requirements: [],
    grants: [],
    costs: 0
  },
];*/

export default tiles as IAbstractTileInformation[];