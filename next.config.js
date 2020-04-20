require('dotenv').config()
const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    TEST_VAR: process.env.TEST_VAR,
    API_BASEURL: process.env.API_BASEURL,
    API_XRAPIDKEY: process.env.API_XRAPIDKEY,
    API_XRAPIDHOST: process.env.API_XRAPIDHOST
  },
  cssLoaderOptions: {
    url: false
  }
})