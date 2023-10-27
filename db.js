const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.POSTRES_USERNAME,
  password: process.env.POSTGRES_PW,
  host: 'localhost',
  port: 5432,
  database: 'blogs',
})

module.exports = pool
