const searchService = require('../services/placesSearchesServices');

//GOOGLE PLACES API Search By Name
exports.searchByName = async (req, res, next) => {
    try{
        const searchString = req.query.name;
        const result = await searchService.searchByName(searchString);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}