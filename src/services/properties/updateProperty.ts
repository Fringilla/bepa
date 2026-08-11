import prisma from '../../prisma/client'

export default async function updateProperty(id: string, data: any) {

  const existing = await prisma.property.findUnique({
    where: { id: id },
  });
  if (!existing) {
    return
  }

  const updated = await prisma.property.update({
    where: { id: id },
    data: { ...data, id: id },
  });

  if (updated)
    return updated;
}
