import prisma from './client'
//import amenityData from '../data/amenities.json'
import userData from '../data/users.json'
import hostData from '../data/hosts.json'
import propertyData from '../data/properties.json'
import bookingData from '../data/bookings.json'
import reviewData from '../data/reviews.json'

/**
 * Clears data from entity
 * @param entity 
 * @param name 
 */
async function clearData(entity: any, name: string = '') {

  name = name || entity.name

  console.log(`Clearing ${name} data...`)
  await entity.deleteMany()

}

/**
 * Seed data from data to entity
 * @param data 
 * @param entity 
 * @param clear 
 * @param name 
 * @param pk 
 * @returns 
 */
async function seedData(data: any[], entity: any, clear: boolean = false, name: string = '', pk: string = 'id') {

  name = name || entity.name

  if (clear) {
    await clearData(entity, name)

    console.log(`Seeding ${name}...`)
    for (const x of data) {
      await entity.create({ data: x })
      console.log(`Created ${name} with ${pk}: ${x[pk]}`)
    }
    
    return
  }

  console.log(`Seeding ${name}...`)
  for (const x of data) {
    // const result = 
    await entity.upsert({
      where: { [pk]: x[pk] },
      update: x,
      create: x
    })
    console.log(`Upserted ${name} with ${pk}: ${x[pk]}`)
  }
}

async function main() {
  console.log(`Start seeding...`)

  let clear = true // Set to true to clear the database before seeding; otherwise upsert will be used to avoid duplicates
  if (clear)
  {
    await clearData(prisma.user)
    await clearData(prisma.host)
    await clearData(prisma.property)
    await clearData(prisma.booking)
    await clearData(prisma.review)
    
    clear = false
  }

  //const { amenities } = amenityData
  const { users } = userData
  const { hosts } = hostData
  const { properties } = propertyData
  const { bookings } = bookingData
  const { reviews } = reviewData

  //await seedData(amenities, prisma.amenity, clear)
  await seedData(users, prisma.user, clear)
  await seedData(hosts, prisma.host, clear)
  await seedData(properties, prisma.property, clear)
  await seedData(bookings, prisma.booking, clear)
  await seedData(reviews, prisma.review, clear)
  
  console.log(`Finished seeding.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
