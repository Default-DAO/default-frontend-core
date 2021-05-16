if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: __dirname + '/.env'})
}

console.log(`next.config.js`);
console.log(`NODE_ENV===${process.env.NODE_ENV}`);
console.log(`API_URL===${process.env.API_URL}`);

module.exports = {
  env: {
    API_URL: process.env.API_URL,
  }
}