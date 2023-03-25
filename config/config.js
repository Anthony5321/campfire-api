require('dotenv').config()
module.exports = {
  development: {
    database: 'campfire',
    dialect: 'postgres',
    username: 'postgres',
    password: '1234'
  },
  test: {
    database: 'campfire',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}