import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import auth from './middleware/auth'
import log from './middleware/log'
import errorHandler from './middleware/errorHandler'
import conflictErrorHandler from './middleware/conflictErrorHandler'
import notFoundErrorHandler from './middleware/notFoundErrorHandler'
import unauthorizedErrorHandler from './middleware/unauthorizedErrorHandler'
import bookingsRouter from './routes/bookings'
import hostsRouter from './routes/hosts'
import loginRouter from './routes/login'
import propertyRouter from './routes/properties'
import reviewsRouter from './routes/reviews'
import usersRouter from './routes/users'

const app = express()

app.use(express.json())

app.use(log) // Logging middleware
app.use(auth) // Authorization middleware

const latest: string = '' // ? '/v1';
app.use(`${latest}/bookings`, bookingsRouter)
app.use(`${latest}/hosts`, hostsRouter)
app.use(`${latest}/login`, loginRouter)
app.use(`${latest}/properties`, propertyRouter)
app.use(`${latest}/reviews`, reviewsRouter)
app.use(`${latest}/users`, usersRouter)

/// Error middleware
app.use(unauthorizedErrorHandler)
app.use(notFoundErrorHandler)
app.use(conflictErrorHandler)
app.use(errorHandler)

export const server = createServer(app)
