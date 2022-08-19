import { Command } from 'commander';

import { parseCSV, collectData } from './parser/parser.js';

const program = new Command();
program
  .option('-c, --collect', 'Get data from resource and save as csv')
  .option('-p, --parse', 'Parse csv to get the data');
program.parse(process.argv);

const options = program.opts();

// main commands
if (options.collect) {
    console.log('start collecting data...');
    const data = await collectData();
    console.log('Last date:', data[0].date);
    console.log('finish collecting data.');
};

if (options.parse) {
    console.log('start parsing data...');
    const data = parseCSV();
    console.log('Amount of rows in the db.csv:', data.length);
    console.log('finish parsing data.');
}

// display help or completed status
if(Object.keys(options).length === 0){
  program
    .usage("node src/index.js [options]")
    .help();
} else {
  console.log('---completed---');
}
