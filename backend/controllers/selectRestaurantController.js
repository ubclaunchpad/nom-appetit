import { searchPlaces } from '../services/placesSearchesServices.js';

//GOOGLE PLACES API Search By Name
exports  = async (req, res, next) => {
    try{
        const searchString = req.query.name;
        const result = await searchPlaces.searchByName(searchString);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}