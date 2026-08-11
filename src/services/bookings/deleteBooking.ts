import prisma from '../../prisma/client'

export default async function deleteBooking(id: string) {

  const existing = await prisma.booking.findUnique({
    where: { id: id },
  })
  if (!existing) {
    return
  }

  const deleted = await prisma.booking.delete({
    where: { id: id },
  })

  if (deleted)
    return deleted
}
