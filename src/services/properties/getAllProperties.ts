import prisma from '../../prisma/client'
import { Prisma } from '../../prisma/generated/client'

const getAllProperties = async (location: string, pricePerNight: number, includeHost: boolean = true, includeBookings: boolean = true, includeReviews: boolean = true) => {

  const clauses = []
  if (pricePerNight) {
    clauses.push( { pricePerNight: pricePerNight } )
  }
  if (location) {
    clauses.push( { location: location } )
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
