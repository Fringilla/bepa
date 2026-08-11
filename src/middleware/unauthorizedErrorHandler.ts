const unauthorizedErrorHandler = (err: any, req: any, res: any, next: any) => {
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401)
      .set('WWW-Authenticate', 'Bearer')
      .json({ success: false, error: { type: 'Unauthorized', message: err.message } })
  }

  next(err)
}

export default unauthorizedErrorHandler