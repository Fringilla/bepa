import prisma from '../../prisma/client'

const getUser = async (userId: string, includeBookings: boolean = true, includeReviews: boolean = true, includePassword: boolean = false) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      username: true,
      password: includePassword,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      bookings: includeBookings,
      reviews: includeReviews,
    }
  })

  if (user) {
    return user
  }
}

export default getUser