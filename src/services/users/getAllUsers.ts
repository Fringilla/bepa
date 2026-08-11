import prisma from '../../prisma/client'

const getAllUsers = async (username: string, email: string, includeBookings: boolean = true, includeReviews: boolean = true, includePassword: boolean = false) => {

  const clauses = []
  if (username) {
    clauses.push( { username: username } )
  }
  if (email) {
    clauses.push( { email: email } )
  }
  const where = (clauses.length > 1) ? { AND: clauses } : (clauses.length == 1 ) ? clauses[0] : {}

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
