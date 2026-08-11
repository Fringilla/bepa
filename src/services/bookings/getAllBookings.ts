import prisma from '../../prisma/client'

const getAllBookings = async (userId: string, includeUser: boolean = true, includeProperty: boolean = true) => {

  let where = {}
  if (userId) {
    where = { userId, ...where }
  }
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
