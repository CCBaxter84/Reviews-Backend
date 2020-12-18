const { Pool, Client } = require('pg');
const redis = require('redis');
require('dotenv').config();
const crypto = require('crypto');

const pool = new Pool({
  user: 'postgres',
  host: '3.131.51.200',
  database: 'mydatabase',
  max: 300,
  password: process.env.PASSWORD,
  port: 5432
});

const client = redis.createClient({
  port: 6379,
  host: '3.128.124.218'
});

function getReviews(productId, callback) {
  // Create hash from query to use as Redis key
  const query = `SELECT * FROM newreviews WHERE product_id = ${productId} AND reported IS NULL`;
  const hash = crypto.createHash('sha1').update(query).digest('hex');
  client.get(hash, (error, redisResult) => {
    if (error) {
      callback(error, null);
    } else if (!redisResult) {
      pool.query('SELECT * FROM newreviews WHERE product_id = $1 AND reported IS NULL', [productId], (err, postgresResults) => {
        if (err) {
          callback(err, null);
        } else {
          client.setex(hash, 3600, JSON.stringify(postgresResults.rows));
          callback(null, postgresResults.rows);
        }
      });
    } else {
      callback(null, JSON.parse(redisResult));
    }
  });
}

function addReview(params, callback) {
  pool.query('INSERT INTO newreviews (rating, recommend, response, body, date, reviewer_name, helpfulness, reported, product_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function markAsHelpful(reviewId, callback) {
  pool.query('UPDATE newreviews SET helpfulness = helpfulness + 1 WHERE review_id = $1', [reviewId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function reportReview(reviewId, callback) {
  pool.query('UPDATE newreviews SET reported = TRUE WHERE review_id = $1', [reviewId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function getCharacteristics(productId, callback) {
  pool.query('SELECT characteristic_id, name, value FROM newchars WHERE product_id = $1', [productId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function getMetadata(productId, callback) {
  pool.query('SELECT rating, recommend FROM newreviews WHERE product_id = $1 AND reported IS NULL', [productId], (err, results) => {
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