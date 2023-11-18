const express = require('express');
const app = express();
const port = 3000;
// Middleware to parse JSON data
app.use(express.json());

const mapsRouter = require('./routes/mapsRoutes');
app.use('/maps', mapsRouter);

const placesSearchRouter = require('./routes/placesSearchRoutes');
app.use('/placesSearch', placesSearchRouter);




// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});