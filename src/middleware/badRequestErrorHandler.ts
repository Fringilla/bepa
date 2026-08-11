const badRequestErrorHandler = (err: any, req: any, res: any, next: any) => {

  if (err.name === 'BadRequestError') {
    return res.status(400)
      .json({ success: false, error: { type: 'Bad Request', message: err.message } })
  }

  next(err)
}

export default badRequestErrorHandler