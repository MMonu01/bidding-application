const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Connection } = require("../config/db");

const { AuthMiddleware } = require("../middlewares/auth-middleware");
const { CreateUserTable } = require("../model/user-model");

const UserRouter = express.Router();

UserRouter.get("/profile", AuthMiddleware, (req, res, next) => {
  Connection.query(`SELECT username, email, role FROM users WHERE id = '${req.userId}';`, (err, result) => {
    if (err) {
      console.log("error ", err);
      next("something went wrong", err);
    } else {
      res.send(result[0]);
    }
  });
});

UserRouter.post("/register", CreateUserTable, async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.send("Invalid credentials");
  }

  bcrypt.hash(password, parseInt(process.env.BYCRYPT_SALT_ROUND), (err, hashed_password) => {
    if (!!err) {
      return next(err);
    }

    let query = "";

    if (!!role && (role === "user" || role === "admin")) {
      query = `INSERT INTO users (username,email,password,role) VALUES('${username}','${email}','${hashed_password}','${role}');`;
    } else {
      query = `INSERT INTO users (username,email,password) VALUES('${username}','${email}','${hashed_password}');`;
    }

    Connection.query(query, (err, results) => {
      if (err) {
        next("something went wrong", err);
        console.log("error ", err);
      } else {
        res.status(201).send("user registered successfully");
      }
    });
  });
});

UserRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Invalid credentials");
  }

  try {
    Connection.query(`SELECT * FROM users WHERE email = '${email}'`, (err, results) => {
      console.log("results", results);
      if (err) {
        next("something went wrong", err);
        console.log("error ", err);
      } else {
        if (results.length === 0) {
          return res.send("email is not registered");
        }

        bcrypt.compare(password, results[0].password, function (err, result) {
          if (!!err) {
            next("something went wrong", err);
          }

          if (result) {
            const token = jwt.sign({ userId: results[0].id }, process.env.token_secret, { expiresIn: 7 * 24 * 60 * 60, algorithm: process.env.jwt_algorithm });
            const refresh_token = jwt.sign({ userId: results[0].id }, process.env.refresh_token_secret, { expiresIn: 28 * 24 * 60 * 60, algorithm: process.env.jwt_algorithm });

            res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.cookie("refresh_token", refresh_token, { maxAge: 28 * 24 * 60 * 60 * 1000 });
            res.status(200).send({ data: { logged_in_success: true } });
          } else {
            res.send("Invalid password");
          }
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = { UserRouter };
