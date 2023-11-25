const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/mapsController');

// GET route for fetching polyline 
router.get('/', mapsController.fetchPolyline);


module.exports = router;
