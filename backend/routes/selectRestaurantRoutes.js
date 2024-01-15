import express from 'express';
import selectRestaurantController from '../controllers/selectRestaurantController.js';
const selectRestaurantRouter = express.Router();

//GET route for Search By Name
// REQUIRES : query with latitude & longitude (lat, lng) of origin and destination
//          : Current Time / Departure Time (in seconds)
// RETURNS : JSON object with polyline
selectRestaurantRouter.get('/', selectRestaurantController);

export default selectRestaurantRouter;
