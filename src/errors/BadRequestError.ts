class BadRequestError extends Error {

  status: number = 400
  
  constructor (reason: string) {
    super(`Bad Request: ${reason}`)
    
    this.name = 'BadRequestError'
  }
}

export default BadRequestError