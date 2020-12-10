const express = require('express');
const router = express.Router();
const {
  getReviews, addReview, markAsHelpful, reportReview,
  getCharacteristics, getMetadata } = require('../db/queries.js');

// @route GET
// @desc  Get all reviews by Product Id
router.get('/:product_id/list', (req, res) => {
  const productId = req.params.product_id;
  getReviews(productId, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json({ results });
    }
  });
});

// @route GET
// @desc  Get Product Review Metadata & Characteristics
router.get('/:product_id/meta', (req, res) => {
  const productId = req.params.product_id;
  getMetadata(productId, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const ratings = {};
      const recommended = { 0:0, 1:0 };
      for (let i = 0; i < results.rows.length; i++) {
        let row = results.rows[i].rating;
        if (ratings[row] || ratings[row] === 0 ) {
          ratings[row]++;
        } else {
          ratings[row] = 0;
        }
        let rec = results.rows[i].recommend;
        rec ? recommended[1]++ : recommended[0]++;
      }
      getCharacteristics(productId, (error, results) => {
        if (error) {
          res.status(500).send(error);
        } else {
          const chars = {};
          for (let i = 0; i < results.rows.length; i++) {
            let id = results.rows[i].charateristic_id;
            let name = results.rows[i].name;
            let value = results.rows[i].value;
            chars[name] = { id: id, value: value };
          }
          const finalResults = {
            product_id: productId,
            ratings,
            recommended,
            characteristics: chars
          };
          res.status(200).json( finalResults );
        }
      });
    }
  });
});

// @route POST
// @desc  Add a new Review by Product Id
router.post('/:product_id', (req, res) => {
  const productId = req.params.product_id;
  const { rating, recommend, response, body, date, reviewer_name, helpfulness, reported } = req.body;
  // rating, recommend, response, body, date, reviewer_name, helpfulness, reported, product_id
  const params = [ rating, recommend, response, body, date, reviewer_name, helpfulness, reported, productId ];
  addReview(params, (err, result) => {
    if (err) {
      res.status(500).json({ msg: error });
    } else {
      res.status(201).json({ result });
    }
  });
});

// @route PUT
// @desc  Update existing review as helpful
router.put('/helpful/:review_id', (req, res) => {
  markAsHelpful(req.params.review_id, (err, result) => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.sendStatus(204);
    }
  });

  // res.status(200).json({ msg: 'your mom' });
});

// @route PUT
// @desc  Update existing review as reported
router.put('/report/:review_id', (req, res) => {
  reportReview(req.params.review_id, (err, result) => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;