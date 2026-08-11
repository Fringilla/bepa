import prisma from '../../prisma/client'

export default async function updateReview(id: string, data: any) {

  const existing = await prisma.review.findUnique({
    where: { id: id },
  });
  if (!existing) {
    return
  }

  const updated = await prisma.review.update({
    where: { id: id },
    data: { ...data, id: id },
  });

  if (updated)
    return updated;
}
