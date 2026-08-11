import { Router } from 'express'
import getAllProperties from '../services/properties/getAllProperties'
import getProperty from '../services/properties/getProperty'
import createProperty from '../services/properties/createProperty'
import updateProperty from '../services/properties/updateProperty'
import deleteProperty from '../services/properties/deleteProperty'
import NotFoundError from '../errors/NotFoundError'
import BadRequestError from '../errors/BadRequestError'

const router = Router()

/// GET /properties - Fetch all properties and their information, default including their host, bookings and reviews
router.get(
  '/',
  async (req: any, res: any, next: any) => {
    try {
      const { location, pricePerNight } = req.query
      const result = await getAllProperties(location, Number(pricePerNight))
      if (result) {
        return res.status(200).json(result)
      }

      throw new NotFoundError('Property', '*')

    } catch (error) {
      next(error)
    }
  }
)

/// GET /properties/:id - Fetch a specific property by ID, default including their host, bookings and reviews
router.get(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      const result = await getProperty(id)
      console.log('!! Get property with id', id, 'result:', result)
      if (result) {
        return res.status(200).json(result)
      }

      throw new NotFoundError('Property', id)

    } catch (error) {
      next(error)
    }
  }
)

/// POST /properties - Create a new property
router.post(
  '/',
  async (req: any, res: any, next: any) => {
    try {
      if (req.body) {
        const { hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating } = req.body || {}
        const data = { hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating }
        console.log('Received create property request with data:', data)

        const created = await createProperty(data)
        if (created) {
          console.log('Created property with ID:', created.id, 'created:', created)
          return res.status(201).json(created)
        }
        throw new BadRequestError('Did not perist')

      }
      throw new BadRequestError('No body payload provided')

    } catch (error) {
      next(error)
    }
  }
)

/// PUT /properties/:id - Update a specific property's information by ID
router.put(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      const { hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating } = req.body || {}
      const data = { hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating }
      console.log('Received update property request with ID:', id, 'data:', data)

      const updated = await updateProperty(id, data)
      
      if (updated) {
        console.log('Updated property with ID:', id, 'updated:', updated)
        return res.status(200).json(updated)
      }

      throw new NotFoundError('Property', id)
      
    } catch (error) {
      next(error)
    }
  }
)

/// DELETE /properties/:id - Delete a specific property by ID
router.delete(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      console.log('Received delete property request with ID:', id)

      const deleted = await deleteProperty(id)

      if (deleted) {
        console.log('Deleted property with ID:', id, 'deleted:', deleted)
        res.status(200).send() // No content response
      }

      throw new NotFoundError('Property', id)
      
    } catch (error) {
      next(error)
    }
  }
)

export default router