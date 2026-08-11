class UnauthorizedError extends Error {

  status: number = 401
  
  constructor (reason: string) {
    super(`Unauthorized: ${reason}`)
    
    this.name = 'UnauthorizedError'
  }
}

export default UnauthorizedError