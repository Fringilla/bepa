import { Router } from 'express'
import NotFoundError from '../errors/NotFoundError'
import getAllReviews from '../services/reviews/getAllReviews'
import getReview from '../services/reviews/getReview'
import createReview from '../services/reviews/createReview'
import updateReview from '../services/reviews/updateReview'
import deleteReview from '../services/reviews/deleteReview'
import BadRequestError from '../errors/BadRequestError'

const router = Router()

/// GET /reviews - Fetch all reviews and their information, default including their user and property
router.get(
  '/',
  async (req: any, res: any, next: any) => {
    try {
      const result = await getAllReviews()

      if (result) {
        return res.status(200).json(result)
      }

      throw new NotFoundError('Review', '*')
      
    } catch (error) {
      next(error)
    }
  }
)

/// GET /reviews/:id - Fetch a specific review by ID, default including their user and property
router.get(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      console.log('Received read review request with ID', id)

      const result = await getReview(id)
      if (result) {
        console.log('Found review with ID', id, 'result:', result)
        return res.status(200).json(result)
      }

      throw new NotFoundError('Review', id)
      
    } catch (error) {
      next(error)
    }
  }
)

/// POST /reviews - Create a new review
router.post(
  '/',
  async (req: any, res: any, next: any) => {
    try {
      if (req.body) {
        const { userId, propertyId, rating, comment } = req.body || {}
        const data = { userId, propertyId, rating, comment }
        console.log('Received create review request with data:', data)

        const created = await createReview(data)
        if (created) {
          console.log('Created review with ID:', created.id, 'created:', created)
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

/// PUT /reviews/:id - Update a specific review's information by ID
router.put(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      const { userId, propertyId, rating, comment } = req.body || {}
      const data = { userId, propertyId, rating, comment }
      console.log('Received update request for review with ID:', id, 'data:', data)

      const updated = await updateReview(id, data)

      if (updated) {
        console.log('Updated review with ID:', id, 'updated:', updated)
        return res.status(200).json(updated)
      }
      
      throw new NotFoundError('Review', id)
      
    } catch (error) {
      next(error)
    }
  }
)

/// DELETE /reviews/:id - Delete a specific review by ID
router.delete(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      console.log('Received delete review request with ID:', id)

      const deleted = await deleteReview(id)

      if (deleted) {
        console.log('Deleted review with ID:', id, 'deleted:', deleted)
        return res.status(200).send() // No content response
      }

      throw new NotFoundError('Review', id)

    } catch (error) {
      next(error)
    }
  }
)

export default router