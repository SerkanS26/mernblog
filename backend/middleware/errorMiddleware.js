// not found middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || "Resource not found";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: process.env.NODE_ENV === "production" ? "🍰" : err.stack,
  });
};

export { notFound, errorHandler };
