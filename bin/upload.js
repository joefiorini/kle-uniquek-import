import program from 'commander';
import {SerialPort} from 'serialport';

const {version} = require('../package.json');

program
  .version(version)
  .option('-d, --device <device>', 'The file descriptor for the serial port')
  .option('-b, --baud-rate [baudRate]', 'The baud rate for the serial port (defaults to 19200 for animus firmware)', parseInt, 19200)
  .parse(process.argv);

function runCommand(command, rest, done) {
  console.dir(command)
  if (command === undefined) {
    done();
    return;
  }

  console.log(`Writing command: ${command}`);

  serialPort.write(`${command} `, (err, results) => {
    console.log('err: ', err);
    console.log('results: ', results);
  });

  const [next, ...remaining] = rest;

  console.log('Pausing between commands...');
  setTimeout(() => runCommand(next, remaining, done), 50);
}

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

    console.log(`Connecting to ${device} at ${baudRate}`);

    serialPort.on('open', () => {
      serialPort.on('data', data => {
        console.log('data received: ', data.toString('utf-8'));
      });

      return new Promise((resolve, reject) => {
        const [firstCommand,...rest] = commands;
        runCommand(firstCommand, rest, resolve);
      })
      .then(() => serialPort.close());
    });
  })
  .catch(error => {
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  });

