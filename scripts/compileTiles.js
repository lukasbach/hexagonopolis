const { readFileSync, writeFileSync } = require('fs');

(() => {
  const csv = readFileSync('src/gamedata/tiles.csv', { encoding: 'utf8' }).replace(/\r/g, '');
  const rows = csv.split('\n');
  rows.splice(0, 1);

  const tiles = [];

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

    addRequirement(reqAgriculture,  'agriculture', r => tile.requirements.push(r));
    addRequirement(reqCrystals, 'crystal', r => tile.requirements.push(r));
    addRequirement(reqExtraterretrial, 'extraterrestrial', r => tile.requirements.push(r));
    addRequirement(reqFuel, 'fuel', r => tile.requirements.push(r));
    addRequirement(reqMilitary, 'military', r => tile.requirements.push(r));
    addRequirement(reqNoise,  'noise', r => tile.requirements.push(r));
    addRequirement(reqRelaxation, 'relaxing', r => tile.requirements.push(r));
    addRequirement(reqSightSeeing,  'sightseeing', r => tile.requirements.push(r));
    addRequirement(reqSocial, 'social', r => tile.requirements.push(r));
    addRequirement(reqStone,  'stone', r => tile.requirements.push(r));
    addRequirement(reqWood, 'wood', r => tile.requirements.push(r));
    addRequirement(reqWaste,  'waste', r => tile.requirements.push(r));

    addGranting(grantsAgriculture,  'agriculture', r => tile.grants.push(r));
    addGranting(grantsCrystals, 'crystal', r => tile.grants.push(r));
    addGranting(grantsExtraterretrial, 'extraterrestrial', r => tile.grants.push(r));
    addGranting(grantsFuel, 'fuel', r => tile.grants.push(r));
    addGranting(grantsMilitary, 'military', r => tile.grants.push(r));
    addGranting(grantsNoise,  'noise', r => tile.grants.push(r));
    addGranting(grantsRelaxation, 'relaxing', r => tile.grants.push(r));
    addGranting(grantsSightSeeing,  'sightseeing', r => tile.grants.push(r));
    addGranting(grantsSocial, 'social', r => tile.grants.push(r));
    addGranting(grantsStone,  'stone', r => tile.grants.push(r));
    addGranting(grantsWood, 'wood', r => tile.grants.push(r));
    addGranting(grantsWaste,  'waste', r => tile.grants.push(r));

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
    } if (req.includes('+')) {
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