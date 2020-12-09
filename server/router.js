const express = require('express');
const router = express.Router();
const {
  getReviews, addReviews, markAsHelpful, reportReview,
  getCharacteristics, getMetadata } = require('../db/queries.js');

router.get('/:product_id/list', (req, res) => {
  res.status(200).json({ msg: 'your mom' });
});

router.get('/:product_id/meta', (req, res) => {
  res.status(200).json({ msg: 'your mom' });
});

router.post('/:product_id', (req, res) => {
  res.status(200).json({ msg: 'your mom' });
});

router.put('/helpful/:review_id', (req, res) => {
  res.status(200).json({ msg: 'your mom' });
});

router.put('/report/:review_id', (req, res) => {
  res.status(200).json({ msg: 'your mom' });
});

module.exports = router;