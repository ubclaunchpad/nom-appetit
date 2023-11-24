const https = require('https');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');
//const polyline = require('polyline');

// Define the path to the .env file located outside the project folder
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables from the specified .env file
dotenv.config({ path: envPath });

const apiUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const apiKey = process.env.GOOGLE_PLACES_API_KEY;

const test_location = '37.7749,-122.4194';

if (!apiKey) {
  throw new Error('Google API key is missing. Make sure it is defined in your .env file.');
}

var place_type = 'restaurants';
// radius is in metres
var radius_type = 2000;


async function searchPlaces(user_location) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: place_type,
        type: place_type,
        location: user_location,
        radius: radius_type,
        key: apiKey,
      },
    });

    const results = response.data.results;

    // console testing 
    console.log('Search Results:');
    
    results.forEach(result => {
      console.log(result.name, '-', result.formatted_address);
    });

    // results
    return results;

  } catch (error) {
    throw new Error('Error searching places: ' + error.message);
  }
}

searchPlaces(test_location)