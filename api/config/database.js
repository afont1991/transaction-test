require('dotenv').config()

let dbConfig;

dbConfig = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}

export { dbConfig }
