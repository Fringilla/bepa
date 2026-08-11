import prisma from '../../prisma/client'
import { ReviewCreateInput } from '../../prisma/generated/models'

export default async function createReview(data: any) {

  const input: ReviewCreateInput = { ...data, id: undefined } // Ensure id is undefined for new property creation
  const created = await prisma.review.create({
    data: input
  });

  if (created)
    return created;
}
