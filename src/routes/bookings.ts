import { Router } from 'express'
import NotFoundError from '../errors/NotFoundError'
import getAllBookings from '../services/bookings/getAllBookings'
import getBooking from '../services/bookings/getBooking'
import createBooking from '../services/bookings/createBooking'
import updateBooking from '../services/bookings/updateBooking'
import deleteBooking from '../services/bookings/deleteBooking'
import BadRequestError from '../errors/BadRequestError'

const router = Router()

/// GET /bookings - Fetch all bookings and their information, default including their user and property
router.get(
  '/',
  async (req: any, res: any, next: any) => {
    try {
      const result = await getAllBookings()

      if (result) {
        return res.status(200).json(result)
      }

      throw new NotFoundError('Booking', '*')
      
    } catch (error) {
      next(error)
    }
  }
)

/// GET /bookings/:id - Fetch a specific booking by ID, default including their user and property
router.get(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      console.log('Received read booking request with ID', id)

      const result = await getBooking(id)
      if (result) {
        console.log('Found booking with ID', id, 'result:', result)
        return res.status(200).json(result)
      }

      throw new NotFoundError('Booking', id)
      
    } catch (error) {
      next(error)
    }
  }
)

/// POST /bookings - Create a new booking
router.post(
  '/',
  async (req: any, res: any, next: any) => {
    try {
      if (req.body) {
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body || {}
        const data = { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus }
        console.log('Received create booking request with data:', data)

        const created = await createBooking(data)
        if (created) {
          console.log('Created booking with ID:', created.id, 'created:', created)
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

/// PUT /bookings/:id - Update a specific booking's information by ID
router.put(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body || {}
      const data = { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus }
      console.log('Received update request for booking with ID:', id, 'data:', data)

      const updated = await updateBooking(id, data)

      if (updated) {
        console.log('Updated booking with ID:', id, 'updated:', updated)
        return res.status(200).json(updated)
      }
      
      throw new NotFoundError('Booking', id)
      
    } catch (error) {
      next(error)
    }
  }
)

/// DELETE /bookings/:id - Delete a specific booking by ID
router.delete(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      console.log('Received delete booking request with ID:', id)

      const deleted = await deleteBooking(id)

      if (deleted) {
        console.log('Deleted booking with ID:', id, 'deleted:', deleted)
        return res.status(200).send() // No content response
      }

      throw new NotFoundError('Booking', id)

    } catch (error) {
      next(error)
    }
  }
)

export default router