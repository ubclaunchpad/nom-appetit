import express from 'express';
import { surveyController } from '../controllers/surveyController.js';

const surveyRouter = express.Router();

// GET (gets data from survey in FE)
surveyRouter.get('/', surveyController.fetchPolyline);

export default surveyRouter;

