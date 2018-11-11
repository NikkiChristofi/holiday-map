import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import data from './data';

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

router.get('/data', async (request, response) => {
  response.send({ holidays: data.getCollection("holidays") })
})

//TODO: Change to PUT once i've installed postman
router.get('/add', async (request, response) => {

  //url = "https://eu1.locationiq.com/v1/search.php?key=9f3e8184e6da14&q=" + destination + "&format=json";

  //put it in the db
  var holidays = data.getCollection("holidays");
  holidays.insert({
    name: request.query.name,
    startdate: "8Nov18",
    enddate: "22Nov18",
    lat: request.query.lat,
    lon: request.query.lon,
  });

  response.send(200);
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
