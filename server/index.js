const express = require('express');
const app = express();
const PORT = 4000;
const {
  getReviews, addReviews, markAsHelpful, reportReview,
  getCharacteristics, getMetadata } = require('../db/queries.js');

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running and listening on port ${PORT}`));
