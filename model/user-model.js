const { Connection } = require("../config/db");

const CreateUserTable = (req, res, next) => {
  Connection.query(
    `CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT, username VARcHAR(30) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL, email  VARcHAR(50) UNIQUE NOT NULL, role ENUM('user', 'admin') DEFAULT 'user', created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    (err, results) => {
      if (err) {
        console.log("error ", err);
        return next("something went wrong", err);
      }
      next();
    }
  );
};

module.exports = { CreateUserTable };
