const jwt = require("jsonwebtoken");
const User = require("../models/user");
async function requireAuth(req, res, next) {
  try {
    //read token off cookies
    const token = req.cookies.Authorization;
    //decode the token
    const decode = jwt.verify(token, process.env.SECRET);

    //  check expiration
    if (Date.now() > decode.exp) return res.sendStatus(401);

    //find user using decoded sub
    const user = await User.findById(decode.sub);
    if (!user) return res.sendStatus(401);

    //attach user to req
    req.user = user;

    //continue on
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = requireAuth;
