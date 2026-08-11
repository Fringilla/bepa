import prisma from '../../prisma/client'

const getBooking = async (id: string, includeUser: boolean = true, includeProperty: boolean = true) => {

  const existing = await prisma.booking.findUnique({
    where: {
      id: id
    },
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
    } 
  })
  if (existing) {
    return existing
  }
}

export default getBooking