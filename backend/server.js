// index.js
import express from 'express';
import myVariable from './services/search.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(myVariable);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
