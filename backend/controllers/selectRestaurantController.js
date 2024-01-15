import { fetchPolyLineService } from '../services/drawMapsServices.js';

const selectRestaurantController = async (req, res, next) => {
    try {
        // Call the function directly
        const result = await fetchPolyLineService(req.query.origin, req.query.destination, req.query.departureTime);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export default selectRestaurantController;