// ===== imports  =====
import axios from 'axios';
import dotenv from 'dotenv';

// ===== api configuration  =====
dotenv.config({ path: './services/config/.env' });

const GOOGLE_KEY = process.env.GOOGLE_KEY;
const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

if (!GOOGLE_KEY) {
  throw new Error ('API Key is either missing or invalid')
}

// ===== functions =====
export async function searchRestaurants(user_location, keyword) {
  const TYPE = 'restaurant';
  const RADIUS = 2000;

  try {
    const response = await axios.get(GOOGLE_URL, {
      params: {
        key: GOOGLE_KEY,
        type: TYPE,
        radius: RADIUS,
        location: user_location,
        query: keyword,
      }
    });

    return response.data.results; 

  } catch (error) {
    throw new Error(error.message);
  }
}