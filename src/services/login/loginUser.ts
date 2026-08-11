import prisma from '../../prisma/client'

const loginUser = async (username: string, email: string, password: string) => {
  if ((!username && !email) || !password) {
    throw new Error('An username or email with password are required to login.')
  }

  if (email) {
    console.log(`Logging in with email: '${email}'`)

    const [user, host] = await Promise.all([
      prisma.user.findUnique({
        where: {
          email: email,
          password: password,
        },
        select: {
          id: true, username: true, name: true, email: true, phoneNumber: true, pictureUrl: true, bookings: false, reviews: false
        }
      }),
      prisma.host.findUnique({
        where: {
          email: email,
          password: password,
        },
        select: {
          id: true, username: true, name: true, email: true, phoneNumber: true, pictureUrl: true, listings: false
        }
      }),
    ])

    if (user || host)
      return user ?? host ?? undefined

  } // else if (username) ...

  console.log(`Logging in with username: '${username}'`)
  const [user, host] = await Promise.all([
    prisma.user.findUnique({
        where: {
          username: username,
          password: password,
        },
        select: {
          id: true, username: true, name: true, email: true, phoneNumber: true, pictureUrl: true, bookings: false, reviews: false
        },
      }),
    prisma.host.findUnique({
      where: {
        username: username,
        password: password,
      },
      select: {
          id: true, username: true, name: true, email: true, phoneNumber: true, pictureUrl: true, listings: false
      }
    })
  ])

  if (user || host)
    return user ?? host ?? undefined
}

export default loginUser
