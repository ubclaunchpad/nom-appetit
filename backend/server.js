const express = require('express');
const app = express();
const port = 3000;
const mapRoutes = required("./src/routes/mapsRoutes");

// Middleware to parse JSON data
app.use(express.json());
app.use('/api', mapsRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});