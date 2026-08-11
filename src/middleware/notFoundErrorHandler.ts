const notFoundErrorHandler = (err: any, req: any, res: any, next: any) => {

  if (err.name === 'NotFoundError') {
    return res.status(404)
      .json({ success: false, error: { type: 'Not Found', message: err.message } })
  }

  next(err)
}

export default notFoundErrorHandler