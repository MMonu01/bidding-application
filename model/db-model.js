const { Connection } = require("../config/db");

const CreateDbMiddlware = (req, res, next) => {
  Connection.query(`CREATE DATABASE IF NOT EXISTS auction`, (err, results) => {
    if (err) {
      console.log("error ", err);
      return next("something went wrong", err);
    }
    next();
  });
};

module.exports = { CreateDbMiddlware };
