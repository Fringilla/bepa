import prisma from '../../prisma/client'
import NotFoundError from '../../errors/NotFoundError'
import { UserUpdateInput } from '../../prisma/generated/models';

export default async function updateUser(id: string, data: any) {

  console.log('Updating user with ID:', id, 'and :', {  ...data, password: '****' }) // Mask password in logs for security;

  const existingUser = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!existingUser) {
    throw new NotFoundError('User', id);
  }

  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: { ...data, id: id } as UserUpdateInput,
  });
  return updatedUser;
}
