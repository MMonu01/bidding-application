const express = require("express");
const cookieParser = require("cookie-parser");

const { UserRouter } = require("./routes/user-routes");
const { AuctionRouter } = require("./routes/auction-routes");

const { Connection } = require("./config/db");
const { CreateDbMiddlware } = require("./model/db-model");

const PORT = 9000;

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.cookie_parser_key));

app.use(CreateDbMiddlware);

app.use("/users", UserRouter);
app.use("/items", AuctionRouter);

Connection.connect((err) => {
  if (err) {
    console.log("failed to connect to db", err);
  } else {
    console.log("connection to db successfull");
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  }
});
