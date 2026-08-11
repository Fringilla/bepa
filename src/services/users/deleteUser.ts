import prisma from '../../prisma/client'
import NotFoundError from '../../errors/NotFoundError'

export default async function deleteUser(id: string) {

  console.log('Deleting user with ID:', id);

  const existingUser = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!existingUser) {
    throw new NotFoundError('User', id);
  }

  const deletedUser = await prisma.user.delete({
    where: { id: id },
  });
  return deletedUser;
}
