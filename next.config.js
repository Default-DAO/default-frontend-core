if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: __dirname + '/.env'})
}

module.exports = {
  env: {
    API_URL: process.env.API_URL,
  }
}