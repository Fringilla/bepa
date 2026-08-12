import prisma from '../../prisma/client'

/**
 * Gets all bookings optional filtered by userId
 * @param userId 
 * @param includeUser 
 * @param includeProperty 
 * @returns 
 */
const getAllBookings = async (userId: string, includeUser: boolean = true, includeProperty: boolean = true) => {

  const clauses = []
  if (userId) {
    clauses.push( { userId: userId } )
  }
  const where = (clauses.length > 1) ? { AND: clauses } : (clauses.length == 1 ) ? clauses[0] : {}

  const many = await prisma.booking.findMany({
    where: where,
    select: {
      id: true,
      userId: true,
      user: includeUser,
      propertyId: true,
      property: includeProperty,
      checkinDate: true,
      checkoutDate: true,
      numberOfGuests: true,
      totalPrice: true,
      bookingStatus: true,
      // _count: true,
    } 
  })

  if (many && many.length > 0)
    return many
}

export default getAllBookings
