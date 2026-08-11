import { AUTH_SECRET_KEY } from '../utils/env'
import logger from '../utils/logger'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import loginUser from '../services/login/loginUser'

const router = Router()

router.post('/', async (req, res, next) => {
  const { username, email, password } = req.body || {}
  console.log('Login request received with username:', username ?? '(none)', ', email:', email ?? '(none)')
  //logger.info(`Login request received with username: ${username}, email: ${email}`)

  try {
    const user: any = await loginUser(username, email, password)
    if (!user) {
        // REMARK! 401 voor nu, maar misschien is het wel 200 omdat we wel kunnen antwoorden op API niveau
        return res.status(401)
          .json({ success: false, error: { message: 'Invalid credentials!' } }) 
    }

    console.log('Logged in user:', user.username)
    //logger.info(`Logged in user: ${user.username}`, user)
    const token = jwt.sign({
      userId: user.id, 
      name: user.name ?? `[${user.username}]`, 
    //   email: user.email, 
    //   pictureUrl: user.pictureUrl,
    }, AUTH_SECRET_KEY)

    return res.status(200)
      .json({ success: true, token, message: 'Successfully logged in!' })

  } catch (error: any) {
    logger.error(error.message)
    next(error)
  }
})

export default router
