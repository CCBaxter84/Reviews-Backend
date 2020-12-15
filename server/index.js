const express = require('express');
const app = express();
require('newrelic');
const cors = require('cors');
const PORT = 4000;
const router = require('./router.js');
const { pool } = require('../db/queries.js')

app.use(express.json());
app.use(cors());

app.use('/reviews', router);

app.listen(PORT, () => console.log(`Server is running and listening on port ${PORT}`));
