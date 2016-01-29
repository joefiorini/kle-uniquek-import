import program from 'commander';
import downloadData from '../lib/downloadData';
import deserializeData from '../lib/deserializeData';
import buildSetKeyCommands from '../lib/divergeUtils';
import {flatten} from 'lodash/array';
import fs from 'fs';

const {version} = require('../package.json');

function jsonFile(path) {
  const file = fs.readFileSync(path, {encoding: 'utf-8'});
  return JSON.parse(file);
}

program
  .version(version)
  .option('-d, --gist-id [gistId]', 'Data URL')
  .option('-m, --custom-mappings [mappingFile]', 'JSON file containing custom keycode mappings', jsonFile)
  .option('-l, --layer [layer]', 'The layer this layout corresponds to', parseInt, 0)
  .parse(process.argv)
  .action(env => {
  });

const {gistId, layer, customMappings} = program;

downloadData(gistId)
  .then(data => {
    console.log('Keyboard: ', data[0].name)
    return data;
  })
  .then(([,...rows]) => deserializeData(rows))
  .then(flatten)
  .then(keys => buildSetKeyCommands(keys, layer, customMappings))
  .then(result => console.log(result))
  .catch(error => {
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  });
