import prisma from '../../prisma/client'

/**
 * Retrieves all hosts
 * 
 * @param includeListings - should property listings be included
 * @param includePassword - should password property be included
 * @returns Host[]
 */
const getAllHosts = async (includeListings: boolean = true, includePassword: boolean = false) => {
  const hosts = await prisma.host.findMany({
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
