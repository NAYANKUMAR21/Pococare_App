const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).send('welcome');
});
app.listen(8080, () => {
  console.log('listening');
});
