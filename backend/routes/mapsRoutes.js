import express from 'express';
const router = express.Router();
const mapsController = require('../controllers/mapsController');

// GET route for fetching maps data
router.get('/maps', mapsController.getMapsData);

router.get('maps/search', mapsController.getMapsData);

module.exports = router;
