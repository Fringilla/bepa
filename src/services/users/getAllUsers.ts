import prisma from '../../prisma/client'

const getAllUsers = async (username: string, email: string, includeBookings: boolean = true, includeReviews: boolean = true, includePassword: boolean = false) => {

  let where = {}
  if (username) {
    where = { username: username, ...where }
  }
  else if (email) {
    where = { email: email, ...where }
  }

  const users = await prisma.user.findMany({
    where: where,
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
  if (users && users.length > 0)
    return users
}

export default getAllUsers
