const jwt = require('jsonwebtoken');
const { firebaseAdmin } = require('./firebaseSetup'); // Import your Firebase Admin setup

function jwtMiddleware(req, res, next) {
  // Get the token from the request headers
  const token = req.header('Authorization');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // requires secret from .env file
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  });
}
export default jwtMiddleware;
