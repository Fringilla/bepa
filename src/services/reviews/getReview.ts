import prisma from '../../prisma/client'

const getReview = async (id: string, includeUser: boolean = true, includeProperty: boolean = true) => {

  const existing = await prisma.review.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      userId: true,
      user: includeUser,
      propertyId: true,
      property: includeProperty,
      rating: true,
      comment: true,
    } 
  })
  if (existing) {
    return existing
  }
}

export default getReview