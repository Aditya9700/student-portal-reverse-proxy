/**
 * Middleware to handle routes that are not found (404).
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass error to the centralized error handler
};

/**
 * Centralized error handler middleware.
 * Formats errors and returns consistent JSON responses.
 */
const errorHandler = (err, req, res, next) => {
  // If the status code is still 200, set it to 500 (Internal Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Cast Error (e.g., invalid ObjectId format)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = 'Resource not found: Invalid ID format';
  }

  // Handle Mongoose Duplicate Key Error (e.g., registering duplicate email)
  if (err.code === 11000) {
    statusCode = 400;
    // Extract duplicate field name if possible
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate field value entered: A user with this ${field} already exists.`;
  }

  // Handle Mongoose Validation Error (e.g., missing required fields in schema)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Handle JWT Verification Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Not authorized, invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Not authorized, token has expired';
  }

  // Log error stack for debugging in development environment
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[Error Handler] Stack Trace:`, err.stack);
  } else {
    console.error(`[Error Handler] Error: ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
