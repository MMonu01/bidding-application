const express = require("express");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const { createServer } = require("http");
require("dotenv").config();
const cors = require("cors");

const { UserRouter } = require("./routes/user-routes");
const { AuctionRouter } = require("./routes/auction-routes");
const { NotificationRouter } = require("./routes/notification-routes");

const { Connection } = require("./config/db");
const { CreateDbMiddlware } = require("./model/db-model");

const { ImplimentSocketIo } = require("./services/socket");

const PORT = 9000;

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(cookieParser(process.env.cookie_parser_key));
app.use(cors({ origin: "http://localhost:9001", credentials: true }));
app.use(CreateDbMiddlware);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

app.use("/users", UserRouter);
app.use("/items", AuctionRouter);
app.use("/notifications", NotificationRouter);

ImplimentSocketIo(io);

Connection.connect((err) => {
  if (err) {
    console.log("failed to connect to db", err);
  } else {
    console.log("connection to db successfull");
    httpServer.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  }
});
