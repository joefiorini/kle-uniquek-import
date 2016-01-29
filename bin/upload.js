import program from 'commander';
import {SerialPort} from 'serialport';

const {version} = require('../package.json');

program
  .version(version)
  .option('-d, --device <device>', 'The file descriptor for the serial port')
  .option('-b, --baud-rate [baudRate]', 'The baud rate for the serial port (defaults to 19200 for animus firmware)', parseInt, 19200)
  .parse(process.argv);


const {device, baudRate} = program;

new Promise((resolve, reject) => {
  process.stdin.on('readable', () => {
    const data = process.stdin.read();
    if (data) {
      return resolve(data.toString('utf-8').split('\n'));
    }
    reject('Need to provide commands on stdin');
  });
})
  .then(commands => {
    const serialPort = new SerialPort(device, {baudRate});

    function runCommand(command, rest, done) {
      if (command === undefined) {
        done();
        return;
      }

      console.log(`Writing command: ${command}`);

      if (command !== '') {
        serialPort.write(`${command} `, (err, results) => {
          console.log('err: ', err);
          console.log('results: ', results);
        });
      }

      const [next, ...remaining] = rest;

      console.log('Pausing between commands...');
      setTimeout(() => runCommand(next, remaining, done), 50);
    }

    console.log(`Connecting to ${device} at ${baudRate}`);

    return new Promise((resolve, reject) => {
      serialPort.on('open', () => {
        serialPort.on('data', data => {
          console.log('data received: ', data.toString('utf-8'));
        });

          const [firstCommand,...rest] = commands;
          runCommand(firstCommand, rest, resolve);
      });
    })
    .then(() => serialPort.close());
  })
  .catch(error => {
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  });
