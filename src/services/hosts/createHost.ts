import prisma from '../../prisma/client'
import { HostCreateInput } from '../../prisma/generated/models';
import { maskPassword } from '../../utils/securePassword';

export default async function createHost(data: any) {

  console.log('Creating host with:', maskPassword(data))

  const existingUsername = await prisma.host.findUnique({
    where: { username: data.username },
  });
  if (existingUsername) {
    throw new Error('Host with this username already exists');
  }

  /// Won't work when email field has no unique constraint!
  // const existingEmail = await prisma.host.findUnique({
  //   where: { email: data.email },
  // });
  // if (existingEmail) {
  //   throw new Error('Host with this email already exists');
  // }

  const input: HostCreateInput = { ...data, id: undefined, listings: undefined } // Ensure id is undefined for new host creation
  const newHost = await prisma.host.create({
    data: input
  });
  return newHost;
}
