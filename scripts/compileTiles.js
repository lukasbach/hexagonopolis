const { readFileSync, writeFileSync } = require('fs');

(() => {
  const csv = readFileSync('src/gamedata/tiles.csv', { encoding: 'utf8' }).replace(/\r/g, '');
  const rows = csv.split('\n');
  rows.splice(0, 1);

  const tiles = [];

  const getPushToArrayFunction = arr => entity => arr.push(entity);

  for (let row of rows) {
    if (row === '') {
      continue;
    }

    const cols = row.split(';');

    const [
      id,
      name,
      assetName,
      costs,
      reqAgriculture,
      reqCrystals,
      reqExtraterretrial,
      reqFuel,
      reqMilitary,
      reqNoise,
      reqRelaxation,
      reqSightSeeing,
      reqSocial,
      reqStone,
      reqWood,
      reqWaste,
      grantsAgriculture,
      grantsCrystals,
      grantsExtraterretrial,
      grantsFuel,
      grantsMilitary,
      grantsNoise,
      grantsRelaxation,
      grantsSightSeeing,
      grantsSocial,
      grantsStone,
      grantsWood,
      grantsWaste,
      description
    ] = cols;

    const tile = {
      id,
      description: description || undefined,
      name,
      assetName,
      costs: costs ? parseInt(costs) : undefined,
      grants: [],
      requirements: []
    };

    addRequirement(reqAgriculture,  'agriculture', getPushToArrayFunction(tile.requirements));
    addRequirement(reqCrystals, 'crystal', getPushToArrayFunction(tile.requirements));
    addRequirement(reqExtraterretrial, 'extraterrestrial', getPushToArrayFunction(tile.requirements));
    addRequirement(reqFuel, 'fuel', getPushToArrayFunction(tile.requirements));
    addRequirement(reqMilitary, 'military', getPushToArrayFunction(tile.requirements));
    addRequirement(reqNoise,  'noise', getPushToArrayFunction(tile.requirements));
    addRequirement(reqRelaxation, 'relaxing', getPushToArrayFunction(tile.requirements));
    addRequirement(reqSightSeeing,  'sightseeing', getPushToArrayFunction(tile.requirements));
    addRequirement(reqSocial, 'social', getPushToArrayFunction(tile.requirements));
    addRequirement(reqStone,  'stone', getPushToArrayFunction(tile.requirements));
    addRequirement(reqWood, 'wood', getPushToArrayFunction(tile.requirements));
    addRequirement(reqWaste,  'waste', getPushToArrayFunction(tile.requirements));

    addGranting(grantsAgriculture,  'agriculture', getPushToArrayFunction(tile.grants));
    addGranting(grantsCrystals, 'crystal', getPushToArrayFunction(tile.grants));
    addGranting(grantsExtraterretrial, 'extraterrestrial', getPushToArrayFunction(tile.grants));
    addGranting(grantsFuel, 'fuel', getPushToArrayFunction(tile.grants));
    addGranting(grantsMilitary, 'military', getPushToArrayFunction(tile.grants));
    addGranting(grantsNoise,  'noise', getPushToArrayFunction(tile.grants));
    addGranting(grantsRelaxation, 'relaxing', getPushToArrayFunction(tile.grants));
    addGranting(grantsSightSeeing,  'sightseeing', getPushToArrayFunction(tile.grants));
    addGranting(grantsSocial, 'social', getPushToArrayFunction(tile.grants));
    addGranting(grantsStone,  'stone', getPushToArrayFunction(tile.grants));
    addGranting(grantsWood, 'wood', getPushToArrayFunction(tile.grants));
    addGranting(grantsWaste,  'waste', getPushToArrayFunction(tile.grants));

    tiles.push(tile);
  }

  writeFileSync('src/gamedata/tiles.json', JSON.stringify(tiles, null, 2));
})();

function addRequirement(req, resourceId, add) {
  const parsed = parseRequirement(req, resourceId);

  if (parsed !== null) {
    add(parsed);
  }
}

function addGranting(req, resourceId, add) {
  if (req !== '' && req !== undefined) {
    add({ resourceId, amount: parseInt(req) });
  }
}

function parseRequirement(req, resourceId) {
  try {
    if (req === '' || req === undefined) {
      return null;
    } else if (req.includes('+')) {
      return { resourceId, min: parseInt(req.replace('+', '')) };
    } else if (req.endsWith('-')) {
      return { resourceId, max: parseInt(req.replace('-', '')) };
    } else if (req.includes('-')) {
      const [min, max] = req.split('-').map(m => parseInt(m));
      return { resourceId, min, max };
    } else if (/\d*/.test(req)) {
      const [min, max] = [parseInt(req), parseInt(req)];
      return { resourceId, min, max };
    } else {
      throw Error(`Could not parse requirement ${req}`);
    }
  } catch(e) {
    console.log(`Requirement parsing failed for resourceID ${resourceId} and requirement "${req}".`);
    console.log(e);
    throw e;
  }
}