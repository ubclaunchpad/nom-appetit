const express = require('express');
const router = express.Router();
const placesSearchesController = require('../controllers/placesSearchesController');

//GET route for Search By Name
router.get('/search',placesSearchesController.searchByName);
