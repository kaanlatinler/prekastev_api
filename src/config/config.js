require("dotenv").config();

module.exports = {
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
  },
  mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};
