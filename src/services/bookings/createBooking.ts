import prisma from '../../prisma/client'
import { BookingCreateInput } from '../../prisma/generated/models'

export default async function createBooking(data: any) {

  const input: BookingCreateInput = { ...data, id: undefined } // Ensure id is undefined for new property creation
  const created = await prisma.booking.create({
    data: input
  });

  if (created)
    return created;
}
