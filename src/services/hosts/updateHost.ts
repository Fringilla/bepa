import prisma from '../../prisma/client'
import NotFoundError from '../../errors/NotFoundError'
import { HostUpdateInput, HostWhereInput, HostWhereUniqueInput } from '../../prisma/generated/models'

export default async function updateHost(id: string, data: any) {

  console.log('Updating host with ID:', id, 'and :', { ...data, password: '****' }) // Mask password in logs for security

  const where: HostWhereUniqueInput = { id: id, username: undefined, email: undefined } // Ensure only id is used for uniqueness
  const existingHost = await prisma.host.findUnique({
    where: where,
  });

  if (!existingHost) {
    throw new NotFoundError('Host', id);
  }

  const updatedHost = await prisma.host.update({
    where: where,
    data: { ...data, id: id } as HostUpdateInput,
  });
  return updatedHost
}
