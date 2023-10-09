const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");
const UserModel = require("../model/user.model");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  var clientIp = requestIp.getClientIp(req);
  // console.log(clientIp)
  if (!userName || !email || !password) {
    return res.send({ message: "some input fields are missing" });
  }

  const checkALreadyRegistered = await UserModel.findOne({ email });
  if (checkALreadyRegistered) {
    return res.send({ message: "user already registered" });
  }

  bcrypt.hash(password, 4, async function (err, hash) {
    // Store hash in your password DB.
    const newUser = await UserModel.create({
      userName,
      email,
      password: hash,
      IP: clientIp,
    });
    res.send({ message: "user registered successful", newUser });
  });
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({ message: "user already registered" });
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.send({ message: "user not found " });
  } else {
    let token = jwt.sign({ userId: user._id }, "secretKey");
    return res.send({ message: "user loge in", token });
  }
});

module.exports = userRouter;
