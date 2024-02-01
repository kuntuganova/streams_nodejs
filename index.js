const fs = require('fs');
const readline = require('readline');

const filePath = 'free_company_dataset.csv';
const countryIndex = 0;

const countryCounts = {};

let lineCount = 0;

const readStream = fs.createReadStream(filePath);
const rl = readline.createInterface({
  input: readStream,
  output: process.stdout,
  terminal: false,
});

rl.on('line', line => {
  if (lineCount === 0) {
    lineCount++;
    return;
  }

  const columns = line.split(',');
  const country = columns[countryIndex].trim();

  if (country !== '') {
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  }
});

rl.on('close', () => {
  const data = [];

  for (const country in countryCounts) {
    data.push({ Country: country, Count: countryCounts[country] });
  }
  console.table(data);
});

readStream.on('error', err => {
  console.error('Error reading the file', err);
});
