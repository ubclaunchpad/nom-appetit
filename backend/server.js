// ===== imports  =====
import express from 'express';
import { searchRestaurants } from './services/search.js';

// ===== express configuration =====
const app = express();
const port = 3000; 

// ===== routing =====
app.get('/search', async (req, res) => {
  // example: /search?location=49.2606,-123.2460&keyword=pizza
  try {
    const { location, keyword } = req.query;
    const restaurants = await searchRestaurants(location, keyword);
    res.json(restaurants);

  } catch (error) {
    throw new Error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
