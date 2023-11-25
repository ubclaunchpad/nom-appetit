const https = require('https');
const path = require('path');
const dotenv = require('dotenv');
//const polyline = require('polyline');

// Define the path to the .env file located outside the project folder
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables from the specified .env file
dotenv.config({ path: envPath });

const apiUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// 1. no need for get locationbyip function anymore
//    will instead take longitude and latitude as parameters

// 2. will also take destination longitude and latitude as parameters


async function fetchPolyline(origin, destination, currentTime) {
  try {
    // defining the response data in the correct format for the api call
    const requestData = {
      origin: {
        location: {
          latLng: {
            latitude: origin.latitude, // CHANGE TO PARAMETER
            longitude: origin.longitude, // CHANGE TO PARAMETER
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: destination.latitude, // CHANGE TO PARAMETER
            longitude: destination.longitude, // CHANGE TO PARAMETER
          },
        },
      },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_AWARE',
      departureTime: currentTime, // MUST BE IN ISO 8601
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      languageCode: 'en-US',
      units: 'IMPERIAL',
    };

    const requestBody = JSON.stringify(requestData);

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
    };
    
    const options = {
      method: 'POST',
      headers: headers,
    };
    
    // function that makes the actual api call
    // needed to put it inside a function so that I could await it in the
    // other function call and have access to it's variables outside.
    function makeApiRequest() {
    
      return new Promise((resolve, reject) => {
        const req = https.request(apiUrl, options, (res) => {
          let data = '';
    
          res.on('data', (chunk) => {
            data += chunk;
          });
    
          res.on('end', () => {
            console.log('API response data:', data);
            // Parse the JSON data and resolve the promise with the parsed data
            resolve(JSON.parse(data));
          });
        });
    
        req.on('error', (error) => {
          console.error('API call failed:', error);
          reject(error);
        });
    
        req.write(requestBody);
        req.end();
      });
    }

    async function accessEncodedPolyline() {
      try {
        // Await the result of the API request
        const data = await makeApiRequest();
        return data; 

        // Log the structure of the received data
        //console.log('Data Structure:', data);
        //const encodedPolyline = data.routes[0].polyline.encodedPolyline;
        //console.log('Encoded Polyline:', encodedPolyline); 
        // Do more processing with the encoded polyline if needed
      } catch (error) {
        console.error('Error making API request:', error);
      }
    }
    const polylineData = await accessEncodedPolyline();
    // You can use locationData safely here
    // If you want to expose the locationData to the caller, you can return it
    return polylineData;
  } catch (error) {
    console.error('Error getting location:', error.message);
    // If an error occurs, you might want to return some default value or handle it differently
    return null;
  }
}