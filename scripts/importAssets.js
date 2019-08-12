const { readFileSync, writeFileSync } = require('fs');
const ncp = require('ncp').ncp;

(() => {
    ncp.limit = 16;

    ncp(`node_modules/hexagonopolis-assets/assets`, `public/assets`, function (err) {
        if (err) {
            console.error('Could not copy asset files!');
            return console.error(err);
        }
        console.log('done!');
    });
})();


