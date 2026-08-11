const conflictErrorHandler = (err: any, req: any, res: any, next: any) => {

  if (err.name === 'ConflictError') {
    return res.status(409)
      .json({ success: false, error: { type: 'Conflict', message: err.message } })
  }

  next(err)
}

export default conflictErrorHandler