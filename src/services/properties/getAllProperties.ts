import prisma from '../../prisma/client'

const getAllProperties = async (includeHost: boolean = true, includeBookings: boolean = true, includeReviews: boolean = true) => {

  const many = await prisma.property.findMany({
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
      // _count: true,
    } 
  })

  if (many)
    return many
}

export default getAllProperties
