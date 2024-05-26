const { Connection } = require("../config/db");

const CreateNotificationsTable = (req, res, next) => {
  Connection.query(`CREATE TABLE IF NOT EXISTS notification (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, message VARCHAR(100) NOT NULL, is_read BOOLEAN DEFAULT false, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id));`, (err, results) => {
    if (err) {
      console.log("error ", err);
      return next("something went wrong", err);
    }
    next();
  });
};

module.exports = { CreateNotificationsTable };
