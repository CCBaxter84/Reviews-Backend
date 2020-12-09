const faker = require('faker');
const objToCSV = require('objects-to-csv');

function createFakeReview() {
  return {
    rating: faker.random.number(),
    recommend: faker.random.boolean(),
    response: faker.random.word(),
    body: faker.random.words(),
    date: JSON.stringify(faker.date.past()),
    reviewer_name: faker.internet.userName(),
    helpfulness: faker.random.number(),
    reported: faker.random.boolean(),
    product_id: faker.random.number()
  };
}

let filename = 'reviews';
let count = 1;

function generateData(file, counter) {
  const filename = './' + file + counter.toString() + '.csv';
  const data = [];
  for (let i = 0; i < 100000; i++) {
    data.push(createFakeReview())
  }
  const csv = new objToCSV(data);
  csv.toDisk(filename);
  return data;
}

for (let i = 0; i < 100; i++) {
  generateData(filename, count);
  count++;
}