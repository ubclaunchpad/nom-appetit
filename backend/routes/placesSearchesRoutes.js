const express = require('express');
const router = express.Router();
const placesSearchesController = require('../controllers/placesSearchesController');

//GET route for Search By Name
// REQUIRES : query with latitude & longitude (lat, lng) of origin and destination
//          : Current Time / Departure Time (in seconds)
// RETURNS : JSON object with polyline
router.get('/search',placesSearchesController.searchByName);
