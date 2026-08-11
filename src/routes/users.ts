import { Router } from 'express'
import NotFoundError from '../errors/NotFoundError'
import getAllUsers from '../services/users/getAllUsers'
import getUser from '../services/users/getUser'
import createUser from '../services/users/createUser'
import updateUser from '../services/users/updateUser'
import deleteUser from '../services/users/deleteUser'
import { excludePassword, maskPassword } from '../utils/securePassword'
import BadRequestError from '../errors/BadRequestError'

const usersRouter = Router()

/// GET /users - Fetch all users and their information, except password
usersRouter.get(
  '/',
  async (req: any, res: any, next: any) => {
    try {
      const users = await getAllUsers()

      if (users) {
        return res.status(200).json(users)
      }

      throw new NotFoundError('User', '*')

    } catch (error) {
      next(error)
    }
  }
)

/// GET /users/:id - Fetch a specific user by ID, including their bookings and reviews
usersRouter.get(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      const user = await getUser(id, true, true, false)
      if (user) {
        return res.status(200).json(user)
      }

      throw new NotFoundError('User', id)

    } catch (error) {
      next(error)
    }
  }
)

/// POST /users - Create a new user
usersRouter.post(
  '/',
  async (req: any, res: any, next: any) => {
    try {
      if (req.body) {
        const { username, password, name, email, phoneNumber, pictureUrl } = req.body || {}
        const data = { username, password, name, email, phoneNumber, pictureUrl }
        console.log('Received create user request with data:', maskPassword(data))

        const created = await createUser(data)
        if (created) {
          console.log('User created with ID:', created.id, 'created:', maskPassword(created))
          return res.status(201).json(excludePassword(created))
        }
        throw new BadRequestError('Did not perist')

      }
      throw new BadRequestError('No body payload provided')

    } catch (error) {
      next(error)
    }
  }
)

/// PUT /users/:id - Update a specific user's information by ID
usersRouter.put(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      const { username, password, name, email, phoneNumber, pictureUrl } = req.body || {}
      const data = { username, password, name, email, phoneNumber, pictureUrl }
      console.log('Received update user request with ID:', id, 'data:', maskPassword(data))

      const updatedUser = await updateUser(id, data)
      
      if (updatedUser) {
        console.log('Updated user with ID:', updatedUser.id, 'updated:', maskPassword(updatedUser))
        return res.status(200).json(excludePassword(updatedUser))
      }

      throw new NotFoundError('User', id)

    } catch (error) {
      next(error)
    }
  }
)

/// DELETE /users/:id - Delete a specific user by ID
usersRouter.delete(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      console.log('Received delete user request with ID:', id)

      const deletedUser = await deleteUser(id)

      if (deletedUser) {
        console.log('Deleted user with ID:', id, 'deleted:', maskPassword(deletedUser))
        return res.status(200).send() // No content response
      }

      throw new NotFoundError('User', id)

    } catch (error) {
      next(error)
    }
  }
)

export default usersRouter