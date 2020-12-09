const express = require('express');
const app = express();
const PORT = 4000;
const router = require('./router.js');

app.use(express.json());

app.use('/reviews', router);


app.get('/reviews/:product_id/list', (req, res) => {
  res.status(200).json({ msg: 'your mom' });
});

app.get('/reviews/:product_id/meta', (req, res) => {
  res.status(200).json({ msg: 'your mom' });
});

app.post('/reviews/:product_id', (req, res) => {
  res.status(200).json({ msg: 'your mom' });
});

app.put('/reviews/helpful/:review_id', (req, res) => {
  res.status(200).json({ msg: 'your mom' });
});

app.put('/reviews/report/:review_id', (req, res) => {
  res.status(200).json({ msg: 'your mom' });
});

app.listen(PORT, () => console.log(`Server is running and listening on port ${PORT}`));
