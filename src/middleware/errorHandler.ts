const errorHandler = (err: any, req: any, res: any, next: any) => {
  
  const name = err.name ?? 'Error'
  console.error(`${name}: ${err.message}`);

  // Set default status code 500 if not provided
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    error: {
      type: name,
      message: err.message,

      // Only show stack trace in development
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
}

export default errorHandler