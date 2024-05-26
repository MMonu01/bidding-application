const { Connection } = require("../config/db");

const CreateBidsTable = (req, res, next) => {
  Connection.query(
    `CREATE TABLE IF NOT EXISTS bids (id INT PRIMARY KEY AUTO_INCREMENT, item_id INT, user_id INT, bid_amount DECIMAL(10,4) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (item_id) REFERENCES items(id), FOREIGN KEY (user_id) REFERENCES users(id));`,
    (err, results) => {
      if (err) {
        console.log("error ", err);
        return next("something went wrong", err);
      }
      next();
    }
  );
};

module.exports = { CreateBidsTable };
