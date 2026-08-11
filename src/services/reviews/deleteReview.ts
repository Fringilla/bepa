import prisma from '../../prisma/client'

export default async function deleteReview(id: string) {

  const existing = await prisma.review.findUnique({
    where: { id: id },
  })
  if (!existing) {
    return
  }

  const deleted = await prisma.review.delete({
    where: { id: id },
  })

  if (deleted)
    return deleted
}
