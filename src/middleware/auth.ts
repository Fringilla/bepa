import jwt from 'jsonwebtoken'
//import UnauthorizedError from '../errors/UnauthorizedError'
import { AUTH_SECRET_KEY } from '../utils/env'

const auth = (req: any, res: any, next: any) => {
  // Allowe for reading
  if (req.method == 'GET') {
    next()
    return
  }

  // Allow for req.method 'POST' with req.path equal to '/login' to pass
  if (req.method === 'POST' && req.path === '/login')
  {
    next()
    return
  }

   // Get auth header - The Authorization header is commonly used to send authentication tokens
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return unauthorized(res, 'Authorization header missing')
    //throw new UnauthorizedError('Authorization header missing')
  }

  try {
    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ').slice(-1)[0];
    if (!token) {
      return unauthorized(res, 'Token missing')
    }

    // Verify token
    jwt.verify(token, AUTH_SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        console.log(err)
        return unauthorized(res, 'Invalid or expired token')
      }

      console.log('decoded:', decoded)
      req.user = decoded
      next()
    })  
  } catch (error: any) {
      return res.status(500)
        .json({ success: false, error: { source: 'auth.ts', message: error.message } })
  } 
}

const unauthorized = (res: any, reason: string) => res.status(401)
  .set('WWW-Authenticate', 'Bearer')
  .json({ success: false, error: { type: 'Unauthorized', reason: reason } })

export default auth