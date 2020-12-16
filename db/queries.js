const { Pool, Client } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: '3.131.51.200',
  database: 'mydatabase',
  max: 300,
  password: process.env.PASSWORD,
  port: 5432
});

function getReviews(productId, callback) {
  pool.query('SELECT * FROM reviewsphotos WHERE product_id = $1 AND reported IS NULL', [productId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

function addReview(params, callback) {
  pool.query('INSERT INTO reviewsphotos (rating, recommend, response, body, date, reviewer_name, helpfulness, reported, product_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function markAsHelpful(reviewId, callback) {
  pool.query('UPDATE reviewsphotos SET helpfulness = helpfulness + 1 WHERE review_id = $1', [reviewId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function reportReview(reviewId, callback) {
  pool.query('UPDATE reviewsphotos SET reported = TRUE WHERE review_id = $1', [reviewId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function getCharacteristics(productId, callback) {
  pool.query('SELECT characteristic_id, name, value FROM partchars WHERE product_id = $1', [productId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function getMetadata(productId, callback) {
  pool.query('SELECT rating, recommend FROM reviewsphotos WHERE product_id = $1 AND reported IS NULL', [productId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  getReviews,
  addReview,
  markAsHelpful,
  reportReview,
  getCharacteristics,
  getMetadata,
  pool
};