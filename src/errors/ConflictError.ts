class ConflictError extends Error {

  status: number = 409
  
  constructor (resourceType: string, property: string, value: string) {
    super(`${resourceType}.${property} with value ${value} already exists!`)
    
    this.name = 'ConflictError'
  }
}

export default ConflictError