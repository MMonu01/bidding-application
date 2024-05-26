const { Connection } = require("../config/db");

const CreateAuctionItemsTable = (req, res, next) => {
  Connection.query(
    `CREATE TABLE IF NOT EXISTS items (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50) NOT NULL, description TEXT(500) NOT NULL, starting_price DECIMAL(10,4) NOT NULL, current_price DECIMAL(10,4) NOT NULL, image_url VARCHAR(50) NOT NULL, end_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, owner_id INT,  FOREIGN KEY (owner_id) REFERENCES users(id))`,
    (err, results) => {
      if (err) {
        console.log("error ", err);
        return next("something went wrong", err);
      }
      next();
    }
  );
};

module.exports = { CreateAuctionItemsTable };
