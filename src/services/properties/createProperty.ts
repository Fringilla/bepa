import prisma from '../../prisma/client'
import { PropertyCreateInput } from '../../prisma/generated/models'

export default async function createProperty(data: any) {

  const input: PropertyCreateInput = { ...data, id: undefined, bookings: undefined, reviews: undefined } // Ensure id is undefined for new property creation
  const created = await prisma.property.create({
    data: input
  });

  if (created)
    return created;
}
