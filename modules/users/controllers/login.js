const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jsonwebtoken = require('jsonwebtoken');
const jwtManager = require('../../../manager/jwtManager');

const login = async (req, res) => {
  const userModel = mongoose.model('users');
  const { email, password } = req.body;

  try {
    //collects as an object.
    const getUser = await userModel.findOne({ email });
    if (!getUser) {
      return res.status(400).json({ error: "This email does not exist" });
    }

    // Add password verification logic here if applicable

    //console.log(getUser)


    const comparePassword = await bcrypt.compare(password, getUser.password);

    if(!comparePassword) return res.status(400).json({ error: "Email and password do not match"});

    const accessToken =  jwtManager(getUser);

    res.status(200).json({
      status: "success",
       message: "Login successful", 
       accessToken: accessToken,
      });
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = login;
