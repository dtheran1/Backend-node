require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || 'dani',
  dbPassword: process.env.DB_PASSWORD || 'admin1234',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'my_store',
  dbPort: process.env.DB_PORT || 5432,
};

module.exports = { config };
