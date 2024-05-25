const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthMiddleware = (req, res, next) => {
  const cookies = req.cookies;

  if (Object.hasOwn(cookies, "token")) {
    jwt.verify(cookies.token, process.env.token_secret, (err, decoded) => {
      if (err) console.log(err);
      if (decoded) {
        req.userId = decoded.userId;
      }
    });
  }

  if (!req.userId && Object.hasOwn(cookies, "refresh_token")) {
    jwt.verify(cookies.refresh_token, process.env.refresh_token_secret, (err, decoded) => {
      if (err) console.log(err);
      if (decoded) {
        req.userId = decoded.userId;

        const new_token = jwt.sign({ userId: decoded.userId }, process.env.token_secret, { expiresIn: 7 * 24 * 60 * 60, algorithm: process.env.jwt_algorithm });
        res.cookie("token", new_token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
      }
    });
  }

  if (req.userId) {
    next();
  } else {
    res.send("session time out please login again");
  }
};

module.exports = { AuthMiddleware };
