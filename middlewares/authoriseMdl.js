const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const authorizeMdl = (req, res, next) => {
  const userToken = req.headers.authorization.split(' ')[1]

  jwt.verify(userToken, "secretKey", async function (err, decoded) {
    const userId = decoded.userId;
    const user = await UserModel.findOne({ _id: userId });
    if (err || !user) {
      console.log("err in auth mdl", err);
      return res.status(400).send("no user found for this id");
    }

    req.userId = userId;
    next();
  });
};

module.exports = authorizeMdl
