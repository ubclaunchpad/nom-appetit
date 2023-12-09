import express from 'express';
const app = express();
const port = 3000;
// Middleware to parse JSON data
app.use(express.json());

import { auth } from './firebase/auth.js';

//import surveyrouter
import surveyRouter from './routes/surveyRoutes.js';
app.use('/survey', surveyRouter);

//import placesSearchRouter
import selectRestaurantRouter from './routes/selectRestaurantRoutes.js';
app.use('/selectRestaurant', selectRestaurantRouter);


// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});