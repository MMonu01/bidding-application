const express = require("express");

const { Connection } = require("../config/db");

const { AuthMiddleware } = require("../middlewares/auth-middleware");
const { CreateAuctionItemsTable } = require("../model/auction-items-model");

const AuctionRouter = express.Router();

AuctionRouter.use(AuthMiddleware);

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

AuctionRouter.get("/:id", CreateAuctionItemsTable, (req, res) => {
  const { id } = req.params;

  Connection.query(`SELECT * FROM items WHERE id = '${id}'`, (err, result) => {
    if (!err) {
      return next(err);
    }

    res.send(result[0]);
  });
});

module.exports = { AuctionRouter };
