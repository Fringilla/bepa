import prisma from '../../prisma/client'

const getAllBookings = async (includeUser: boolean = true, includeProperty: boolean = true) => {

  const many = await prisma.booking.findMany({
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

  if (many)
    return many
}

export default getAllBookings
