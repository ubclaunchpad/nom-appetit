const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Simple route to say hello
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});