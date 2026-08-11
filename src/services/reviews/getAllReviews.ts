import prisma from '../../prisma/client'

const getAllReviews = async (includeUser: boolean = true, includeProperty: boolean = true) => {

  const many = await prisma.review.findMany({
    select: {
      id: true,
      userId: true,
      user: includeUser,
      propertyId: true,
      property: includeProperty,
      rating: true,
      comment: true,
      // _count: true,
    } 
  })

  if (many && many.length > 0)
    return many
}

export default getAllReviews
