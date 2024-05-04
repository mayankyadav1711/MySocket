// custom error handler class that extends the built-in Error class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    //  Call the Error constructor with the provided message
    super(message);
    // Set the status code property
    this.statusCode = statusCode;
  }
}

export { ErrorHandler };
