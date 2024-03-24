const apiUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes';

import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.KEY;

if (!apiKey) {
  throw new Error('Google API key is missing');
}

const myVariable = apiKey;
export default myVariable;
