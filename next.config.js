if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: __dirname + '/.env'})
}

console.log(`next.config.js`);
console.log(`NODE_ENV===${process.env.NODE_ENV}`);
console.log(`API_URL===${process.env.API_URL}`);

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    DEFAULT_CONTRACT_ADDRESS: process.env.DEFAULT_CONTRACT_ADDRESS,
    USDC_CONTRACT_ADDRESS: process.env.USDC_CONTRACT_ADDRESS,
    BUILDERIO_API_KEY: process.env.BUILDERIO_API_KEY
  }
}