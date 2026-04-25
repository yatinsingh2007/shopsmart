// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// eslint-disable-next-line no-unused-vars
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API Endpoint Not Found',
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
