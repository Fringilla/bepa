class NotFoundError extends Error {

  status: number = 404
  
  constructor (resourceType: string, id: string) {
    super(`${resourceType} with id ${id} was not found!`)

    this.name = 'NotFoundError'
  }
}

export default NotFoundError