const express = require("express");

const { Connection } = require("../config/db");

const { AuthMiddleware } = require("../middlewares/auth-middleware");

const { CreateNotificationsTable } = require("../model/notification-model");

const NotificationRouter = express.Router();

NotificationRouter.get("/", AuthMiddleware, CreateNotificationsTable, (req, res, next) => {
  const user_id = req.userId;

  Connection.query(`SELECT user_id,message,is_read,created_at FROM notification WHERE user_id = '${user_id}' AND is_read = false`, (err, result) => {
    if (!!err) {
      console.log("err", err);
      return next(err);
    }

    res.send(result);
  });
});

NotificationRouter.post("/mark-read", AuthMiddleware, (req, res, next) => {
  const user_id = req.userId;

  Connection.query(`UPDATE notification SET is_read = true WHERE user_id = ${user_id} AND is_read = false`, (err, result) => {
    if (!!err) {
      console.log("err", err);
      return next(err);
    }

    res.send("mark as read successfull");
  });
});

module.exports = { NotificationRouter };
