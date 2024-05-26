const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const { Connection } = require("../config/db");

const { AuthMiddleware } = require("../middlewares/auth-middleware");

const { CreateBidsTable } = require("../model/bids-model");
const { CreateAuctionItemsTable } = require("../model/auction-items-model");

const { GetLiveImageurl } = require("../util/get-live-image-url");

const AuctionRouter = express.Router();

// Auction items route start
AuctionRouter.get("/", CreateAuctionItemsTable, (req, res, next) => {
  const { page_no } = req.query;
  const items_limit = 10;

  Connection.query(`SELECT * FROM items LIMIT ${items_limit} OFFSET ${(page_no - 1) * items_limit};`, (err, result) => {
    if (!!err) {
      console.log("err", err);
      return next(err);
    }

    res.send(result);
  });
});

AuctionRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Connection.query(`SELECT * FROM items WHERE id = '${id}'`, (err, result) => {
    if (!!err) {
      return next(err);
    }
    res.send(result[0]);
  });
});

AuctionRouter.post("/", CreateAuctionItemsTable, AuthMiddleware, upload.single("image"), (req, res, next) => {
  const { name, description, starting_price, current_price, end_time } = req.body;
  GetLiveImageurl(req.file.filename)
    .then((image_url) => {
      let query = "";

      if (end_time) {
        query = `INSERT INTO items (name,description,starting_price,current_price,image_url,end_time,owner_id) VALUES ('${name}','${description}','${starting_price}','${current_price}','${image_url}','${end_time}','${req.userId}');`;
      } else {
        query = `INSERT INTO items (name,description,starting_price,current_price,image_url,owner_id) VALUES ('${name}','${description}','${starting_price}','${current_price}','${image_url}','${req.userId}');`;
      }

      Connection.query(query, (err, result) => {
        if (!!err) {
          console.log(err);
          return next(err);
        }
        console.log("result", result);
        res.send("Auction Item uploaded successfully");
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

AuctionRouter.put("/:id", AuthMiddleware, (req, res, next) => {
  const { id } = req.params;

  const { name, description, starting_price, current_price, end_time } = req.body;

  Connection.query(`SELECT * FROM items WHERE id = '${id}'`, (err, result) => {
    if (!!err) {
      console.log(err);
      return next(err);
    }

    if (req.userId === result[0].owner_id || result[0].role === "admin") {
      if (end_time) {
        query = `UPDATE items SET name ='${name}', description ='${description}', starting_price ='${starting_price}', current_price ='${current_price}', end_time = '${end_time}' WHERE id = '${id}';`;
      } else {
        query = `UPDATE items SET name ='${name}', description ='${description}', starting_price ='${starting_price}', current_price ='${current_price}' WHERE id = '${id}';`;
      }

      Connection.query(query, (err, result) => {
        if (!!err) {
          console.log(err);
          return next(err);
        }
        console.log("result", result);
        res.send("Auction Item updated successfully");
      });
    }
  });
});

AuctionRouter.delete("/:id", AuthMiddleware, (req, res, next) => {
  const { id } = req.params;

  Connection.query(`SELECT * FROM items WHERE id = '${id}'`, (err, result) => {
    if (!!err) {
      console.log(err);
      return next(err);
    }

    if (req.userId === result[0].owner_id || result[0].role === "admin") {
      Connection.query(`DELETE FROM items WHERE id = '${id}'`, (err, result) => {
        if (!!err) {
          console.log(err);
          return next(err);
        }
        console.log("result", result);
        res.send("Auction Item deleted successfully");
      });
    }
  });
});

// Auction items route ends

// Bids route start
AuctionRouter.get("/:itemId/bids", CreateBidsTable, (req, res, next) => {
  const { itemId } = req.params;

  Connection.query(`SELECT id,item_id,bid_amount,created_at FROM bids WHERE id = '${itemId}'`, (err, result) => {
    if (!!err) {
      return next(err);
    }
    res.send(result);
  });
});

AuctionRouter.post("/:itemId/bids", CreateBidsTable, AuthMiddleware, (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.userId;
  const { bid_amount } = req.body;

  Connection.query(`INSERT INTO bids (item_id,user_id,bid_amount) VALUES ('${itemId}','${userId}','${bid_amount}') `, (err, result) => {
    if (!!err) {
      return next(err);
    }
    res.send("Bid accepted successfully");
  });
});

// bid route ends

module.exports = { AuctionRouter };
