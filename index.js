const express = require("express");

const { Connection } = require("./config/db");

const PORT = 9000;

const app = express();
app.use(express.json());

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
