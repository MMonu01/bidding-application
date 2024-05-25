const { Connection } = require("../config/db");

const CreateBidsTable = (req, res, next) => {
  Connection.query(`CREATE TABLE IF NOT EXISTS bids (id INT PRIMARY KEY AUTO_INCREMENT, item_id INT FOREIGN KEY REFERENCES items(id), user_id INT FOREIGN KEY REFERENCES users(id), bid_amount DECIMAL(10,4) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`, (err, results) => {
    if (err) {
      console.log("error ", err);
      return next("something went wrong", err);
    }
    next();
  });
};

module.exports = { CreateBidsTable };
