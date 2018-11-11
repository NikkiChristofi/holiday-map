require('dotenv').config()

const api = {
  serviceName: process.env.API_NAME,
  port: process.env.PORT
}

export default {
  api
}
