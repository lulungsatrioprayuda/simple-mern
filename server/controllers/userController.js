const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function signup(req, res) {
  try {
    // Dapatkan email dan password dari body request
    const { email, password } = req.body;

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Buat user dengan data dari request
    await User.create({ email, password: hashedPassword });

    // Setelah user berhasil dibuat, buat token JWT
    const user = await User.findOne({ email });
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // Set cookie dengan token JWT
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Berikan respons dengan status 200 (OK)
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

async function login(req, res) {
  try {
    //get the email and password from req body
    const { email, password } = req.body;

    //find the user with requested email
    const user = await User.findOne({ email: email });
    if (!user) return res.sendStatus(401);

    //compare sent in password with found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    //create a jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp: exp }, process.env.SECRET);

    //set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV == "production",
    });

    //send it
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  try {
    console.log(req.user);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

function logout(req, res) {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

module.exports = {
  signup,
  login,
  checkAuth,
  logout,
};
