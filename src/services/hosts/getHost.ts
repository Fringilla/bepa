import prisma from '../../prisma/client'

const getHost = async (hostId: string, includeListings: boolean = true, includePassword: boolean = false) => {
  const host = await prisma.host.findUnique({
    where: {
      id: hostId
    },
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
    }
  })

  if (host) {
    return host
  }
}

export default getHost