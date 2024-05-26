const mysql = require("mysql2");
require("dotenv").config();

const Connection = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: "auction",
});

module.exports = { Connection };
