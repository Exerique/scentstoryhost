const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.stack}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }


  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }


  res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = errorHandler;