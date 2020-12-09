const faker = require('faker');
const objToCSV = require('objects-to-csv');

function createFakePhoto() {
  return {
    url: faker.image.imageUrl(),
    review_id: Math.floor(Math.random() * 10000000) + 1
  };
}

let filename = 'photos';
let count = 1;

function generateData(file, counter) {
  const filename = './' + file + counter.toString() + '.csv';
  const data = [];
  for (let i = 0; i < 100000; i++) {
    data.push(createFakePhoto())
  }
  const csv = new objToCSV(data);
  csv.toDisk(filename);
  return data;
}

for (let i = 0; i < 100; i++) {
  generateData(filename, count);
  count++;
}