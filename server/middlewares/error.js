import { envMode } from "../index.js";


//This middleware function is designed to handle errors that occur during request processing
const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if (err.code === 11000) {
    const error = Object.keys(err.keyPattern).join(",");
    err.message = `Duplicate field - ${error}`;
    err.statusCode = 400;
  }

  if (err.name === "CastError") {
    const errorPath = err.path;
    err.message = `Invalid Format of ${errorPath}`;
    err.statusCode = 400;
  }

  const response = {
    success: false,
    message: err.message,
  };

  if (envMode === "DEVELOPMENT") {
    response.error = err;
  }

  return res.status(err.statusCode).json(response);
};

// This function is a higher-order function that wraps asynchronous middleware functions with error handling
// It takes another function (passedFunc) as input and returns an asynchronous middleware function
const TryCatch = (passedFunc) => async (req, res, next) => {
  try {
    // Inside this wrapper function, it executes passedFunc and awaits its completion
    await passedFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};

export { errorMiddleware, TryCatch };
