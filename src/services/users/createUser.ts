import prisma from '../../prisma/client'
// import { ConflictError } from '../../errors/ConflictError'
import { UserCreateInput } from '../../prisma/generated/models'

export default async function createUser(data: any) {

  console.log('Creating user with:', { ...data, password: '****' }) // Mask password in logs for security

  /*
  // TODO : Lookup user(s) having same username or email.
  // - Should result in a 409 - Conflict HTTP status code from the router
  const lookup = await prisma.user.findMany({
    where: {
      OR: [
        { email: { equals: data.email ?? null } },
        { username: { equals: data.username ?? null } },
      ]
    }
  });
  if (lookup.length > 0) {
    throw new ConflictError()
  }
  */

  const input: UserCreateInput = { ...data, id: undefined, bookings: undefined, reviews: undefined } // Ensure id is undefined for new user creation
  const newUser = await prisma.user.create({
    data: input
  });
  return newUser;
}
