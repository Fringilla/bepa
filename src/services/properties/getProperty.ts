import prisma from '../../prisma/client'

const getProperty = async (id: string, includeHost: boolean = true, includeBookings: boolean = true, includeReviews: boolean = true) => {

  const existing = await prisma.property.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      pricePerNight: true,
      bedroomCount: true,
      bathRoomCount: true,
      maxGuestCount: true,
      rating: true,
      hostId: true,
      host: includeHost, 
      bookings: includeBookings,
      reviews: includeReviews,
    } 
  })
  if (existing) {
    return existing
  }
}

export default getProperty