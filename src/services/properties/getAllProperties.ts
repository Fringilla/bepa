import prisma from '../../prisma/client'

/**
 * Gets all properties optional filtered by location and/or pricePerNight
 * @param location 
 * @param pricePerNight 
 * @param includeHost 
 * @param includeBookings 
 * @param includeReviews 
 * @returns 
 */
const getAllProperties = async (location: string, pricePerNight: number, includeHost: boolean = true, includeBookings: boolean = true, includeReviews: boolean = true) => {

  const clauses = []
  if (location) {
    clauses.push( { location: location } )
  }
  if (pricePerNight) {
    clauses.push( { pricePerNight: pricePerNight } )
  }
  const where = (clauses.length > 1) ? { AND: clauses } : (clauses.length == 1 ) ? clauses[0] : {}
  
  const many = await prisma.property.findMany({
    where: where,
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

  if (many && many.length > 0)
    return many
}

export default getAllProperties
