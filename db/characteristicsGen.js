const faker = require('faker');
const objToCSV = require('objects-to-csv');

function createFakeCharacteristics() {
  const names = [ 'Size', 'Length', 'Width', 'Quality', 'Comfort', 'Fit' ];
  const randomIndex = Math.floor(Math.random() * names.length);
  const randomName = names[randomIndex];
  const values = [null, 1, 2, 3, 4, 5];
  const valueIndex = Math.floor(Math.random() * values.length);
  const randomValue = values[valueIndex];

  return {
    name: randomName,
    value: randomValue,
    product_id: faker.random.number()
  };
}

let filename = 'characteristics';
let count = 1;

function generateData(file, counter) {
  const filename = './' + file + counter.toString() + '.csv';
  const data = [];
  for (let i = 0; i < 100000; i++) {
    data.push(createFakeCharacteristics())
  }
  const csv = new objToCSV(data);
  csv.toDisk(filename);
  return data;
}

for (let i = 0; i < 100; i++) {
  generateData(filename, count);
  count++;
}