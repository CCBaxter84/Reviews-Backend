const { Pool, Client } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myDatabase',
  password: process.env.PASSWORD,
  port: 3211
});

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'myDatabase',
  password: process.env.PASSWORD,
  post: 3211
});

client.connect();

function getReviews(productId, callback) {
  pool.query('SELECT * FROM reviews WHERE product_id = $1', [productId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

function addReviews(params, callback) {
  pool.query('INSERT INTO reviews (rating, recommend, response, body, date, reviewer_name, helpfulness, reported, product_id)', params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function markAsHelpful(reviewId, callback) {
  pool.query('UPDATE reviews SET helpfullness = helpfulness + 1 WHERE review_id = $1', [reviewId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function reportReview(reviewId, callback) {
  pool.query('UPDATE reviews SET reported = 1 WHERE review_id = $1', [reviewId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function getCharacteristics(reviewId, callback) {
  pool.query('SELECT characteristic_id, name, value FROM characteristics WHERE review_id = $1', [reviewId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function getMetadata(productId, callback) {
  pool.query('SELECT rating, recommended FROM reviews WHERE product_id = $1', [productId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
  getReviews,
  addReviews,
  markAsHelpful,
  reportReview,
  getCharacteristics,
  getMetadata
};