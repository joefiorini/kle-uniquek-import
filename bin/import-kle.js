import program from 'commander';
import downloadData from '../lib/downloadData';
import deserializeData from '../lib/deserializeData';
const {version} = require('../package.json');

program
  .version(version)
  .option('-d, --gist-id [gistId]', 'Data URL')
  .parse(process.argv)
  .action(env => {
  });

console.log('Downloading');
downloadData(program.gistId)
  .then(data => {
    console.log('Keyboard: ', data[0].name)
    return data;
  })
  .then(([,...rows]) => deserializeData(rows))
  .then(result => console.log(result))
  .catch(error => {
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  });
