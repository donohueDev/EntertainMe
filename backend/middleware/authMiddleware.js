// authMiddleware.js was used initially to authenticate users using JWT 
// moved away from jws and hashing for now

// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// // Ensure environment variables are loaded
// dotenv.config();

// // Fetch JWT secret key from environment variables
// const secretKey = process.env.JWT_SECRET_KEY;  // Correct the way we access the secret key

// // Middleware function to authenticate requests
// export const authenticate = (req, res, next) => {
//   // Get token from the Authorization header (Bearer token format)
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     // Verify the token using the secret key
//     const decoded = jwt.verify(token, secretKey); 

//     // Attach the decoded user data to the request object
//     req.user = decoded;

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (err) {
//     // Handle invalid or expired token
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };
