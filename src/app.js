import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'

import config from './config'
import cors from './lib/cors'

const app = express()
const router = express.Router()
app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())
app.use('/', router)

router.get('/uptime', (request, response) => {
  response.send({ uptime: process.uptime() })
})

function serverStart (config) {
  const { port, serviceName } = config
  return app.listen(port, () => {
    console.log(`${serviceName} is listening on: http://127.0.0.1:${port}`)
  })
}

function serverStop (condition, server) {
  console.log(`${condition} received, stopping the server`)
  server.close(() => {
    process.exit(0)
  })
}

const server = serverStart(config.api)

process
  .on('SIGTERM', () => serverStop('SIGTERM', server))
  .on('SIGINT', () => serverStop('SIGINT', server))
