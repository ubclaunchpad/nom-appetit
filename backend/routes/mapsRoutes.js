const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/mapsController');

// GET route for fetching maps data
router.get('/maps', mapsController.getMapsData);

module.exports = router;