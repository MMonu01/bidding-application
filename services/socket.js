const { Connection } = require("../config/db");

const ImplimentSocketIo = (io) => {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("newBid", ({ bid_amount, itemId, userId }) => {
      Connection.query(`INSERT INTO bids (item_id,user_id,bid_amount) VALUES ('${itemId}','${userId}','${bid_amount}') `, (err, result) => {
        if (!!err) {
          return next(err);
        }
        io.emit("notifyNewBid", { bid_amount, itemId });
      });
    });

    socket.on("mark-read", ({ user_id }) => {
      Connection.query(`UPDATE notification SET is_read = true WHERE user_id = ${user_id} AND is_read = false`, (err, result) => {
        if (!!err) {
          console.log("err", err);
          return next(err);
        }

        socket.emit("mark-read", "mark as read successfull");
      });
    });
  });
};

module.exports = { ImplimentSocketIo };
