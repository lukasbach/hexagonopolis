import {ILevel, ILevelAuthor} from "../types";

const author: ILevelAuthor = {
  name: 'Lukas Bach',
  repo: 'TODO',
  website: 'https://lukasbach.com'
};

export const levels: ILevel[] = [
  {
    id: 'campaign-0-0',
    name: 'Tutorial',
    author,
    cards: [
      'tile1', 'tile2'
    ],
    gamemode: 'emptycards',
    iconAsset: 'tile129',
    backgroundColor: '#2ecc71',
    centering: [2, 6],
    tilemap: [
      '..........',
      '...-......',
      '...b--s...',
      '..--.-....',
    ],
    tilemapLegend: {
      '-': {
        type: 'empty',
        asset: 'tile5'
      },
      'b': {
        type: 'placed',
        tileId: 'blocking_rock'
      },
      's': {
        type: 'placed',
        tileId: 'tile0'
      }
    },
    extraTiles: [
      {
        id: 'tile0',
        name: 'Farm',
        description: 'Supplies adjacent fields with agricultural resources. You can place a grocery store on an adjacent tile.',
        requirements: [],
        grants: [
          { resourceId: 'agriculture', amount: 2 }
        ],
        assetName: 'tile124'
      },
      {
        id: 'tile1',
        name: 'Grocery Store',
        description: 'Supplies adjacent fields with social value. You can place an residential house on an adjacent tile.',
        requirements: [
          { resourceId: 'agriculture', min: 2 }
        ],
        grants: [
          { resourceId: 'social', amount: 4 }
        ],
        assetName: 'tile148'
      },
      {
        id: 'tile2',
        name: 'Residential House',
        description: 'This is the final tile to place. Place this on the board to win the level.',
        requirements: [
          { resourceId: 'social', min: 4 }
        ],
        grants: [],
        assetName: 'tile143'
      }
    ],
    predialog: [
      { talkerAsset: 'zebra', talkerName: 'Tutorial', side: 0, message: 'The goal of the game is to get rid of all cards on the bottom bar.' },
      { talkerAsset: 'zebra', talkerName: 'Tutorial', side: 0, message: 'Cards require specific resources to be present on the tile that they are placed on.' },
      { talkerAsset: 'zebra', talkerName: 'Tutorial', side: 0, message: 'If you place a card on the board, all tiles that are directly adjacent will receive the resources that are listed as the card\'s "Grants" resources.'},
      { talkerAsset: 'zebra', talkerName: 'Tutorial', side: 0, message: 'Try to place all the cards you have toi complete the level!' },
    ]
  },
  {
    id: 'campaign-0-1',
    name: 'Getting wood',
    author,
    cards: [
      'final_tile', 'trees_grass', 'trees_grass', 'trees_grass', 'lumberjack'
    ],
    gamemode: 'emptycards',
    iconAsset: 'tile129',
    backgroundColor: '#2ecc71',
    tilemap: [
      '..........',
      '..---.....',
      '.b-..--...',
      '.--b---...',
      '..---b....',
    ],
    tilemapLegend: {
      '-': {
        type: 'empty',
        asset: 'tile5'
      },
      'b': {
        type: 'placed',
        tileId: 'blocking_rock'
      }
    },
    extraTiles: [
      {
        id: 'final_tile',
        name: 'Mine Shaft',
        requirements: [
          { resourceId: 'wood', min: 7 }
        ],
        grants: [],
        assetName: 'tile160'
      }
    ],
    predialog: [
      { talkerAsset: 'buffalo', talkerName: 'Mayor Buffalo', side: 0, message: 'Welcome to Hexanopolis! Well, at least to the beginning of it...' },
      { talkerAsset: 'penguin', talkerName: 'Penguin M.Sc.', side: 2, message: 'This does not look like a large city...' },
      { talkerAsset: 'buffalo', talkerName: 'Mayor Buffalo', side: 0, message: 'We need some resource infrastructure before we can start construction.' },
      { talkerAsset: 'buffalo', talkerName: 'Mayor Buffalo', side: 0, message: 'Your first goal is to place the mine shaft to guarantee a proper stone supply.' },
    ]
  },
  {
    id: 'campaign-0-2',
    name: 'Getting Stone',
    author,
    cards: ['road_grass_stone', 'road_grass_stone', 'road_grass_stone', 'stone_processing_site'],
    gamemode: 'emptycards',
    backgroundColor: '#2ecc71',
    iconAsset: 'tile160',
    tilemap: [
      'B..b..b.',
      '.mb--mB.',
      '..--Bb..',
      '..---b..',
      '.m-bB-m.',
      'Bb....bB',
    ],
    centering: [2, 4],
    tilemapLegend: {
      '-': {
        type: 'empty',
        asset: 'tile5'
      },
      'b': {
        type: 'placed',
        tileId: 'blocking_rock'
      },
      'B': {
        type: 'placed',
        tileId: 'blocking_rock_2'
      },
      'm': {
        type: 'placed',
        tileId: 'preplaced_mineshaft'
      }
    },
    extraTiles: [
      {
        id: 'preplaced_mineshaft',
        name: 'Mine Shaft',
        requirements: [],
        grants: [
          { resourceId: 'stone', amount: 6 }
        ],
        assetName: 'tile160'
      },
      {
        id: 'stone_processing_site',
        name: 'Stone Processing Site',
        requirements: [
          { resourceId: 'stone', min: 10 }
        ],
        grants: [],
        assetName: 'tile128'
      }
    ],
    predialog: [
      { talkerAsset: 'buffalo', talkerName: 'Mayor Buffalo', side: 0, message: 'With your help, we could establish four large stone excavation sites in the area.' },
      { talkerAsset: 'buffalo', talkerName: 'Mayor Buffalo', side: 0, message: 'No we need to connect them to a stone processing site.' },
      { talkerAsset: 'penguin', talkerName: 'Penguin M.Sc.', side: 2, message: 'The excavation sites seem to be rather far away from each other.' },
      { talkerAsset: 'buffalo', talkerName: 'Mayor Buffalo', side: 0, message: 'Yeah, the construction manager was a real monkey...' },
      { talkerAsset: 'monkey',  talkerName: 'Manager Banana', side: 0, message: 'Excuse me?' },
      { talkerAsset: 'buffalo', talkerName: 'Mayor Buffalo', side: 0, message: 'Anyway, try to connect the excavation sites with these transportation roads!' },
      { talkerAsset: 'penguin', talkerName: 'Penguin M.Sc.', side: 2, message: 'I\'ll see what I can do.' },
    ]
  },
  {
    id: 'campaign-0-3',
    name: 'Houses for the poor',
    author,
    cards: ['shop0', 'shop1', 'waste_plant', 'residential0', 'residential0', 'residential1', 'residential2', 'farm_fields'],
    gamemode: 'emptycards',
    backgroundColor: '#2ecc71',
    iconAsset: 'tile160',
    tilemap: [
      '.w.--w..',
      '.W---b--',
      '----W-..',
      '.W---..B',
      '--B----.',
      '..--.-b.',
    ],
    centering: [2, 4],
    tilemapLegend: {
      '-': {
        type: 'empty',
        asset: 'tile5'
      },
      'b': {
        type: 'placed',
        tileId: 'blocking_rock'
      },
      'B': {
        type: 'placed',
        tileId: 'blocking_rock_2'
      },
      'w': {
        type: 'placed',
        tileId: 'trees_grass'
      },
      'W': {
        type: 'placed',
        tileId: 'lumberjack'
      }
    },
    predialog: [
      { talkerAsset: 'duck', talkerName: 'Duck Sr', side: 0, message: 'We have let our statistician analyze data from our newly founded city, and we have some news.' },
      { talkerAsset: 'duck', talkerName: 'Duck Sr', side: 0, message: 'Good news is: We actually have zero percent homeless people!' },
      { talkerAsset: 'duck', talkerName: 'Duck Sr', side: 0, message: 'Bad news are, we don\t have any inhabitants.' },
      { talkerAsset: 'snake', talkerName: 'Statistican Snake', side: 0, message: 'I usssed Python to analyze that!' },
      { talkerAsset: 'duck', talkerName: 'Duck Sr', side: 0, message: 'Lets actually start building some houses, shall we?' },
      { talkerAsset: 'penguin', talkerName: 'Penguin M.Sc.', side: 0, message: 'I\'ll do Sir.' },
    ]
  },
  {
    id: 'campaign-0-4',
    name: 'Sightseeing wonders',
    author,
    cards: ['castle_small', 'castle_small', 'arc', 'castle_big', 'camping', 'trees_grass', 'trees_grass', 'trees_grass', 'lumberjack'],
    gamemode: 'emptycards',
    backgroundColor: '#2ecc71',
    iconAsset: 'tile158',
    tilemap: [
      '....p.....',
      '...pb.....',
      '..Bp---b..',
      '.--v---B.b',
      '-m---...--',
      '--s..--m-.',
      '.---....b.',
      '..b----m..',
    ],
    centering: [2, 5],
    tilemapLegend: {
      '-': {
        type: 'empty',
        asset: 'tile5'
      },
      'b': {
        type: 'placed',
        tileId: 'blocking_rock'
      },
      'B': {
        type: 'placed',
        tileId: 'blocking_rock_2'
      },
      'w': {
        type: 'placed',
        tileId: 'trees_grass'
      },
      'm': {
        type: 'placed',
        tileId: 'preplaced_military_camp'
      },
      'p': {
        type: 'placed',
        tileId: 'preplaced_path_to_visitor_center'
      },
      'v': {
        type: 'placed',
        tileId: 'preplaced_visitor_center'
      },
      's': {
        type: 'placed',
        tileId: 'preplaced_mine_shaft'
      }
    },
    extraTiles: [
      {
        id: 'preplaced_military_camp',
        name: 'Military Camp',
        description: 'A small military camp which is located here by the army. Sadly, we do not have the permissions to move it.',
        assetName: 'tile96',
        requirements: [],
        grants: [
          { resourceId: 'military', amount: 2 }
        ]
      },
      {
        id: 'preplaced_path_to_visitor_center',
        name: 'Path',
        description: 'A small path that leads from your town to the local visitor center.',
        assetName: 'tile28',
        requirements: [],
        grants: []
      },
      {
        id: 'preplaced_visitor_center',
        name: 'Visitor Center',
        description: 'A small building that attracts lots of tourists.',
        assetName: 'tile130',
        requirements: [],
        grants: [
          { resourceId: 'social', amount: 3 }
        ]
      },
      {
        id: 'preplaced_mine_shaft',
        name: 'Mine Shaft',
        assetName: 'tile160',
        requirements: [],
        grants: [
          { resourceId: 'stone', amount: 3 }
        ]
      },
    ],
    predialog: [
      { talkerAsset: 'owl', talkerName: 'Park Service Owl', side: 0, message: 'There is actually a large nature reserve close to to your town.' },
      { talkerAsset: 'owl', talkerName: 'Park Service Owl', side: 0, message: 'We think it would be a good idea to build some sightseeing buildings to attract more tourists to our town.' },
      { talkerAsset: 'owl', talkerName: 'Park Service Owl', side: 0, message: 'Unfortunately, there are some military camps constructed by the government.' },
      { talkerAsset: 'owl', talkerName: 'Park Service Owl', side: 0, message: 'We might have to build around them.' },
    ]
  },
  {
    id: 'campaign-0-cityfill-0',
    name: 'Fill the City',
    backgroundColor: '#2ecc71',
    author,
    cards: [
      'farm_fields', 'lumberjack', 'residential0', 'residential1', 'castle_small', 'castle_big', 'office_small', 'office_medium',
      'shop0', 'shop1', 'waste_plant', 'church', 'camping', 'trees_grass', 'library', 'police',
      'trees_grass', 'trees_grass', 'trees_grass', 'trees_grass', 'trees_grass',
    ],
    gamemode: 'cityfill',
    iconAsset: '',
    tilemap: [
      '....b..-----..',
      '.......B..b---',
      '...----b..--..',
      '.----.Ba----..',
      '...b------....',
      '.....B..b-----',
    ],
    tilemapLegend: {
      '-': { type: "empty", asset: 'tile5' },
      'a': { type: 'placed', tileId: 'preplaced_joker' },
      'b': { type: 'placed', tileId: 'blocking_rock' },
      'B': { type: 'placed', tileId: 'blocking_rock_2' },
    },
    centering: [3, 10],
    extraTiles: [
      {
        id: 'preplaced_joker',
        name: 'Joker',
        grants: [
          { resourceId: 'military', amount: 2 },
          { resourceId: 'relaxing', amount: 2 },
          { resourceId: 'social', amount: 2 },
          { resourceId: 'stone', amount: 2 },
          { resourceId: 'wood', amount: 2 },
        ],
        requirements: [],
        assetName: 'tile93'
      }
    ],
    predialog: [
      { talkerAsset: 'walrus', talkerName: 'Van Walrus', side: 0, message: 'You did a great job preparing the city creation so far.' },
      { talkerAsset: 'walrus', talkerName: 'Van Walrus', side: 0, message: 'We now want to start construction on a much larger pace.' },
      { talkerAsset: 'penguin', talkerName: 'Penguin M.Sc.', side: 1, message: 'But it looks like I have way fewer cards to do so this time.' },
      { talkerAsset: 'walrus', talkerName: 'Van Walrus', side: 0, message: 'This is a Fill-The-City level, your goal is not to get rid of all cards, but fill every free space on the map.' },
      { talkerAsset: 'walrus', talkerName: 'Van Walrus', side: 0, message: 'You will always have exactly four cards on your hands. Every time you place a card, the leftmost card and the placed card will be removed and you will receive two new cards.' },
      { talkerAsset: 'walrus', talkerName: 'Van Walrus', side: 0, message: 'Good luck!' },
    ]
  },
  {
    id: 'campaign-0-5',
    name: 'Increasing Supplies',
    backgroundColor: '#2ecc71',
    author,
    gamemode: 'emptycards',
    iconAsset: '',
    cards: ['trees_grass', 'trees_grass', 'rock_grass', 'rock_grass', 'residential1', 'farm_smelt', 'farm_fields', 'farm_fields', 'farm_fields', 'lumberjack', 'shop0', 'shop1'],
    centering: [2, 6],
    tilemap: [
      'B...b.........',
      '.--..---..b...',
      '...b-.---...B.',
      '..--.--B---...',
      '...b..----....',
      '..-------..b..',
      '....--..B....B'
    ],
    tilemapLegend: {
      '-': { type: "empty", asset: 'tile5' },
      'b': { type: 'placed', tileId: 'blocking_rock' },
      'B': { type: 'placed', tileId: 'blocking_rock_2' },
    },
    predialog: [
      { talkerAsset: 'rabbit', talkerName: 'Senor Rabbit', side: 0, message: 'We have found that, even though we have functioning shops in our city, our supplies are alarmingly low.' },
      { talkerAsset: 'rabbit', talkerName: 'Senor Rabbit', side: 0, message: 'Especially our carrots supplies.' },
      { talkerAsset: 'rabbit', talkerName: 'Senor Rabbit', side: 0, message: 'Man I love carrots.' },
      { talkerAsset: 'rabbit', talkerName: 'Senor Rabbit', side: 0, message: 'We need more resource supplies. Do something, now!' },
    ]
  },


  {
    id: 'campaign-0-1',
    name: 'Empty',
    backgroundColor: '#2ecc71',
    author,
    cards: [],
    gamemode: 'emptycards',
    iconAsset: '',
    tilemap: [],
    tilemapLegend: {}
  },


  {
    id: 'fillthecity-sand',
    name: 'Fill the Western',
    backgroundColor: '#ccbf90',
    author,
    cards: [
      'trees_sand', 'trees_sand', 'trees_sand', 'trees_sand',
      'rock_sand', 'rock_sand',
      'watertower', 'western_shop0', 'sheriff', 'sheriff', 'tipis', 'tipis', 'western_bank', 'saloon0', 'saloon1'
    ],
    gamemode: 'cityfill',
    iconAsset: '',
    tilemap: [
      '..b.............b....--...',
      'B...B-------..B...----B...',
      '......b--------....B---...',
      '..b----a---b..---....b....',
      '.....B----B--b..-.....---b',
      '........---...b-.---b.----',
      '....B...b...B---..B-----..',
      '.....B........-.....B---b.',
    ],
    tilemapLegend: {
      '-': { type: "empty", asset: 'tile49' },
      'a': { type: 'placed', tileId: 'preplaced_joker' },
      'b': { type: 'placed', tileId: 'blocking_rock_sand' },
      'B': { type: 'placed', tileId: 'blocking_rock_sand1' },
    },
    centering: [3, 8],
    extraTiles: [
      {
        id: 'preplaced_joker',
        name: 'Joker',
        grants: [
          { resourceId: 'military', amount: 2 },
          { resourceId: 'social', amount: 2 },
          { resourceId: 'stone', amount: 2 },
          { resourceId: 'wood', amount: 2 },
          { resourceId: 'agriculture', amount: 2 },
        ],
        requirements: [],
        assetName: 'tile131'
      }
    ]
  },
  {
    id: 'fillthecity-mars',
    name: 'Fill the Mars',
    backgroundColor: '#ab492f',
    author,
    cards: [
      'mars_trees', 'mars_trees', 'mars_trees', 'mars_trees',
      'mars_crystals', 'mars_crystals', 'mars_crystals',
      'mars_crystal_rock',
      'mars_rock0', 'mars_rock1',
      'mars_residential0', 'mars_residential1',
      'mars_construction', 'mars_factory', 'mars_ship', 'mars_fuelcrate', 'mars_rocket_hall', 'mars_food', 'mars_food'
    ],
    gamemode: 'cityfill',
    iconAsset: '',
    tilemap: [
      '..b.............b....--...',
      'B...B-------..B...----B...',
      '......b--------....B---...',
      '..b----a---b..---....b....',
      '.....B----B--b..-.....---b',
      '........---...b-.---b.----',
      '....B...b...B---..B-----..',
      '.....B........-.....B---b.',
    ],
    tilemapLegend: {
      '-': { type: "empty", asset: 'tile66' },
      'a': { type: 'placed', tileId: 'preplaced_joker' },
      'b': { type: 'placed', tileId: 'blocking_rock_mars0' },
      'B': { type: 'placed', tileId: 'blocking_rock_mars1' },
    },
    centering: [3, 8],
    extraTiles: [
      {
        id: 'preplaced_joker',
        name: 'Joker',
        grants: [
          { resourceId: 'military', amount: 2 },
          { resourceId: 'crystal', amount: 2 },
          { resourceId: 'extraterrestrial', amount: 2 },
          { resourceId: 'fuel', amount: 2 },
          { resourceId: 'agriculture', amount: 2 },
        ],
        requirements: [],
        assetName: 'tile107'
      }
    ]
  },


  {
    id: 'comingsoon',
    name: 'Coming soon',
    backgroundColor: '#2ecc71',
    author,
    cards: [],
    gamemode: 'emptycards',
    iconAsset: '',
    tilemap: [],
    tilemapLegend: {}
  },
  {
    id: 'test-level',
    name: 'Debug',
    author,
    cards: [
      'office_small', 'shop0', 'church', 'joker', 'trees_grass', 'parking', 'fountain', 'trees_sand', 'military_rockets',
      // 'camping', 'office_big', 'castle_big', 'castle_small', 'residential3'
    ],
    gamemode: 'emptycards',
    iconAsset: 'tile5',
    backgroundColor: '#2ecc71',
    tilemap: [
      '----bbb-',
      '-b--b---',
      '-b-b--b-',
      '--b--b--',
      '---bb---',
      '--------',
      '--------',
      '--------',
      '--------',
      '--------',
    ],
    tilemapLegend: {
      '-': {
        type: 'empty',
        asset: 'tile5'
      },
      'b': {
        type: 'placed',
        tileId: 'blocking_rock'
      }
    }
  },
];