const argv = require('minimist')(process.argv.slice(2));
const Arguments = require('./src/arguments');
const exportToCsv = require('./src/exportToCsv');

const options = new Arguments(argv);
console.log(`Beginning with the following options: ${options.toString()}`);
exportToCsv(options);
