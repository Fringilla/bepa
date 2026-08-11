import logger from '../utils/logger'

const log = (req: any, res: any, next: any) => {
  const start: number = Date.now()

  next()

  const ms: number = Date.now() - start
  logger.info(`${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms`)
}

export default log