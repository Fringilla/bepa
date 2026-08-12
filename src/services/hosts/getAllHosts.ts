import prisma from '../../prisma/client'

/**
 * Retrieves all hosts optional filtered by name
 * @param name 
 * @param includeListings - should property listings be included
 * @param includePassword - should password property be included
 * @returns Host[]
 */
const getAllHosts = async (name: string, includeListings: boolean = true, includePassword: boolean = false) => {

  const clauses = []
  if (name) {
    clauses.push( { name: name } )
  }
  const where = (clauses.length > 1) ? { AND: clauses } : (clauses.length == 1 ) ? clauses[0] : {}

  const hosts = await prisma.host.findMany({
    where: where,
    select: { 
      id: true, 
      username: true,
      password: includePassword,
      name: true, 
      email: true, 
      phoneNumber: true,
      pictureUrl: true,
      aboutMe: true,
      listings: includeListings,
      // _count: true,
    } 
  })
  if (hosts && hosts.length > 0)
    return hosts
}

export default getAllHosts
