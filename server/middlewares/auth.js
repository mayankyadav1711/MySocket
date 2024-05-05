import jwt from "jsonwebtoken"; // library for generating and verifying json web tokens (JWT)
import { ErrorHandler } from "../utils/utility.js"; // custom wrror handler
import { adminSecretKey } from "../index.js"; // secret key for admin login
import { TryCatch } from "./error.js"; // helper function to wrap async middleware functions with error handling
import { MY_TOKEN } from "../constants/config.js"; // contant representing token
import { User } from "../models/user.js"; // user model

// This middleware function checks if a user is authenticated by verifying the JWT token present in the request cookies
const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies[MY_TOKEN];

  // If the token is missing, it triggers an error indicating that login is required
  if (!token)
    return next(new ErrorHandler("Please login to access this route", 401));
  // If the token is present, it verifies and decodes the token using the JWT secret key from the environment variables
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // The decoded user ID is then attached to the request object
  req.user = decodedData._id;

  next();
});

// This middleware function restricts access to routes that only the admin can access
const adminOnly = (req, res, next) => {
  // It checks if the request contains an admin token in the cookies
  const token = req.cookies["admin-token"];
  // If the token is missing, it triggers an error indicating that only admins can access the route
  if (!token)
    return next(new ErrorHandler("Only Admin can access this route", 401));
  // If the token is present, it verifies the token using the secret key and compares it with the admin secret key
  const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  const isMatched = secretKey === adminSecretKey;
  if (!isMatched)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  next();
};

// This middleware function authenticates socket connections by verifying the JWT token attached to the socket request cookies
const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[MY_TOKEN];
    // If the token is missing, it triggers an error indicating that login is required
    if (!authToken)
      return next(new ErrorHandler("Please login to access this route", 401));
    // If the token is present, it verifies the token using the secret key and retrieves the user associated with the token from the database.
    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);
    // If the user is found, it attaches the user object to the socket for further use
    const user = await User.findById(decodedData._id);
    // If any error occurs during authentication, it logs the error and triggers an error indicating that login is required
    if (!user)
      return next(new ErrorHandler("Please login to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please login to access this route", 401));
  }
};

export { isAuthenticated, adminOnly, socketAuthenticator };
