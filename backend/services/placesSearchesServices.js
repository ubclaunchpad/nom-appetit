// ======== IMPORTS ========
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import dotenv from 'dotenv';
import axios from 'axios';

// ======== .ENV SETUP  ========

// Use fileURLToPath and dirname to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to the .env file located outside the project folder
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables from the specified .env file
dotenv.config({ path: envPath });

// ======== API SETUP ========
const apiUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const apiKey = process.env.GOOGLE_PLACES_API_KEY;

if (!apiKey) {
  throw new Error('Google API key is missing');
}

// ======== FUNCTIONS ========
// list of all the params (NOTE: not all objects have the params listed):
// https://developers.google.com/maps/documentation/places/web-service/details
export async function searchPlaces(user_location, filter_param_1, filter_param_2, keyword) {
    // basic search
    const textsearch_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    // detailed search
    const details_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
    const type = 'restaurant'
    const radius = 2000; 

    // ======== search ========
    // obtain list of all restaurants near user
    try {
        var places_list = [];

        const response = await axios.get(textsearch_URL, {
            params: {
                key: apiKey,
                location: user_location,
                query: keyword,
                type: type,
                radius: radius,
            }
        });

        var results = response.data.results;

        places_list = results; 

    } catch (error) {
        throw new Error(error.message);
    }

    // ======== filtering ========
    // filters out based on params given from algorithm 
    try {
      var places_list_detailed = [];

      // transforms all object in places_list to detailed object 
      async function detailedResults(place_object) {
        // CONSOLE TESTING REMOVE WHEN FINISHED
        console.log(place_object.place_id);

        const response2 = await axios.get(details_URL, {
          params: {
            key: apiKey,
            place_id: place_object.place_id,
          },
        });

        const detailed_result = response2.data.result; 
        return detailed_result;
      }

      for (var object of places_list) {
        places_list_detailed.push(await detailedResults(object));
      }

      // filtering based on params (BOOLEAN PARAMS ONLY)
      var filtered_list = [];
      for (var object of places_list_detailed) {
        if (object[filter_param_1] && object[filter_param_2]) {
          console.log('\n' + 'name: ' + object.name);
          console.log('formatted_address: ' + object.formatted_address);
          console.log(object.geometry.location);
          filtered_list.push(object);
        }
      }

      return filtered_list;
      
    } catch (error) {
      throw new Error(error.message);
    }
  
}

// ======== TESTING ========

const test_coordinates = '40.7128, -73.935242';

console.log(searchPlaces(test_coordinates, 'delivery', 'serves_brunch', "greek"));