import prisma from '../../prisma/client'

export default async function deleteProperty(id: string) {

  const existing = await prisma.property.findUnique({
    where: { id: id },
  })
  if (!existing) {
    return
  }

  const deleted = await prisma.property.delete({
    where: { id: id },
  })

  if (deleted)
    return deleted
}
