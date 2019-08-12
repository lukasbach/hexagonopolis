import {ICampaign} from "../types";

export const campaigns: ICampaign[] = [
  {
    id: 'campaign-default',
    name: 'Hexagonopolis Campaign',
    backgroundColor: '#aaa',
    author: {
      name: 'Lukas Bach',
      website: 'https://lukasbach.com'
    },
    centering: [1, 1],
    tilemap: [
      'a----Ad-d',
      '------dd-',
      '--beh--d-',
      '-c-fg--d-',
      '---d-ddd-',
      '--d---ddd',
      '-d-d-dd-d',
      'd--------',
    ],
    tilemapLegend: {
      'a': { levelId: 'campaign-0-0', requires: [], asset: 'tile143' },
      'b': { levelId: 'campaign-0-1', requires: [], asset: 'tile129' },
      'c': { levelId: 'campaign-0-2', requires: [], asset: 'tile160' },
      'e': { levelId: 'campaign-0-3', requires: [], asset: 'tile146' },
      'f': { levelId: 'campaign-0-4', requires: [], asset: 'tile158' },
      'h': { levelId: 'campaign-0-cityfill-0', requires: [], asset: 'tile93' },
      'g': { levelId: 'campaign-0-5', requires: [], asset: 'tile124' },
      'd': { levelId: 'comingsoon', requires: [], asset: 'tile5' },
      /*'A': { levelId: 'fillmaptest', requires: [], asset: 'tile120' },*/
      'Z': { levelId: 'test-level', requires: [], asset: 'tile80' },
    }
  },
  {
    id: 'campaign-mapfills',
    name: 'Fill the Map!',
    backgroundColor: '#aaa',
    author: {
      name: 'Lukas Bach',
      website: 'https://lukasbach.com'
    },
    centering: [1, 4],
    tilemap: [
      'a----c',
      '--b---',
      '------',
    ],
    tilemapLegend: {
      'a': { levelId: 'campaign-0-cityfill-0', requires: [], asset: 'tile125' },
      'b': { levelId: 'fillthecity-sand', requires: [], asset: 'tile150' },
      'c': { levelId: 'fillthecity-mars', requires: [], asset: 'tile110' },
    }
  }
];