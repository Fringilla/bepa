import prisma from '../../prisma/client'

const getAllUsers = async (includeBookings: boolean = true, includeReviews: boolean = true, includePassword: boolean = false) => {
  const users = await prisma.user.findMany({
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
      // _count: true,
    } 
  })
  return users
}

export default getAllUsers
