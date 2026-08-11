import prisma from '../../prisma/client'
import NotFoundError from '../../errors/NotFoundError'

export default async function deleteHost(id: string) {

  console.log('Deleting host with ID:', id);

  const existingHost = await prisma.host.findUnique({
    where: { id: id },
  });

  if (!existingHost) {
    throw new NotFoundError('Host', id);
  }

  const deletedHost = await prisma.host.delete({
    where: { id: id },
  });
  return deletedHost;
}
