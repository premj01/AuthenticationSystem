require('dotenv').config();
const os = require('os')

module.exports = {
  port: process.env.PORT || 8000,
  hostname: os.hostname(),
  db: process.env.MONGODB
}