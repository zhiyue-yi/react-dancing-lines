const pkg = require('../package.json');
const fs = require('fs');
const path = require('path');

delete pkg.scripts;

fs.writeFileSync(path.join(__dirname, '../dist/package.json'), JSON.stringify(pkg, null, 2));

fs.copyFileSync(path.join(__dirname, '../README.md'), path.join(__dirname, '../dist/README.md'));
