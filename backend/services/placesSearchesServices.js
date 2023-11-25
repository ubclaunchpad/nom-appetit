// ======== API IMPORTS ========

import path from 'path';
import dotenv from 'dotenv';
import axios from 'axios';

// define the path to the .env file located outside the project folder
const envPath = path.resolve(__dirname, '../.env');

// load environment variables from the specified .env file
dotenv.config({ path: envPath });

const apiUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const apiKey = process.env.GOOGLE_PLACES_API_KEY;

if (!apiKey) {
  throw new Error('Google API key is missing. Make sure it is defined in your .env file.');
}

// ======== FUNCTIONS ========

var search_type = 'restaurants';
var radius_type = 2000;

const test_coordinates = '48.778,-123.707';

export async function searchPlaces(user_location) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        location: user_location,
        query: search_type,
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

searchPlaces(test_coordinates)