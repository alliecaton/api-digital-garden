const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  password: 'wXJjTj4h4bzbD2rPpQjT',
  host: 'localhost',
  port: 5432,
  database: 'blogs',
})

module.exports = pool
