const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jsonwebtoken = require('jsonwebtoken');

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

    console.log(getUser)


    const comparePassword = await bcrypt.compare(password, getUser.password);

    if(!comparePassword) return res.status(400).json({ error: "Email and password do not match"});

    const acessToken =  await jsonwebtoken.sign({_id: getUser._id, full_name:getUser.full_name, email:getUser.email}, process.env.jwt_salt)

    res.status(200).json({
      status: "success",
       message: "Login successful", 
       acessToken: acessToken,
      });
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = login;
