import { Router } from 'express'
import NotFoundError from '../errors/NotFoundError'
import getAllHosts from '../services/hosts/getAllHosts'
import getHost from '../services/hosts/getHost'
import createHost from '../services/hosts/createHost'
import updateHost from '../services/hosts/updateHost'
import deleteHost from '../services/hosts/deleteHost'
import { excludePassword, maskPassword } from '../utils/securePassword'
import BadRequestError from '../errors/BadRequestError'

const hostsRouter = Router()

/// GET /hosts - Fetch all hosts and their information, except password
hostsRouter.get(
  '/',
  async (req: any, res: any, next: any) => {
    try {
      const hosts = await getAllHosts()
      if (hosts) {
        return res.status(200).json(hosts)
      }

      throw new NotFoundError('Host', '*')

    } catch (error) {
      next(error)
    }
  }
)

/// GET /hosts/:id - Fetch a specific host by ID, including their bookings and reviews
hostsRouter.get(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      console.log('Received read host request with ID:', id)
      const host = await getHost(id)

      if (host) {
        console.log('Found host with ID', id, 'result:', maskPassword(host))
        return res.status(200).json(excludePassword(host))
      }

      throw new NotFoundError('Host', id)

    } catch (error) {
      next(error)
    }
  },
)

/// POST /hosts - Create a new host
hostsRouter.post(
  '/',
  async (req: any, res: any, next: any) => {
    try {
      if (req.body) {
        const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = req.body || {}
        const data = { username, password, name, email, phoneNumber, pictureUrl, aboutMe }
        console.log('Received create host request with data:', maskPassword(data))

        const created = await createHost(data)
        if (created) {
          console.log('Created host with ID:', created.id, 'created:', maskPassword(created))
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

/// PUT /hosts/:id - Update a specific host's information by ID
hostsRouter.put(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = req.body || {}
      const data = { username, password, name, email, phoneNumber, pictureUrl, aboutMe }
      console.log('Received update host request with ID:', id, 'data:', maskPassword(data))

      const updatedHost = await updateHost(id, data)

      if (updatedHost) {
        console.log('Updated host with ID:', id, 'updated:', maskPassword(updatedHost))
        return res.status(200).json(excludePassword(updatedHost))
      }

      throw new NotFoundError('Host', id)

    } catch (error) {
      next(error)
    }
  }
)

/// DELETE /hosts/:id - Delete a specific host by ID
hostsRouter.delete(
  '/:id',
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      console.log('Received delete request for host ID:', id)

      const deletedHost = await deleteHost(id)

      if (deletedHost) {
        console.log('Deleted host with ID:', id, 'deleted:', maskPassword(deletedHost))
        return res.status(200).send() // No content response
      }

      throw new NotFoundError('Host', id)

    } catch (error) {
      next(error)
    }
  }
)

export default hostsRouter