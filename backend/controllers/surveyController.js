import fetchPolylineService from '../services/drawMapsServices.js';

export const surveyController = async (req, res, next) => {
    try {
        const result = await fetchPolylineService.fetchPolyline(req.query.origin, req.query.destination, req.query.departureTime);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
