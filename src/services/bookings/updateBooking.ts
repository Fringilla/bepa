import prisma from '../../prisma/client'

export default async function updateBooking(id: string, data: any) {

  const existing = await prisma.booking.findUnique({
    where: { id: id },
  });
  if (!existing) {
    return
  }

  const updated = await prisma.booking.update({
    where: { id: id },
    data: { ...data, id: id },
  });

  if (updated)
    return updated;
}
