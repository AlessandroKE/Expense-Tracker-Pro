const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require('../../../manager/jwtManager');
const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password, confirm_password, full_name, balance } = req.body;

  try {
    // Validations
    if (!email) return res.status(400).json({ error: "Email must be provided!" });
    if (!password) return res.status(400).json({ error: "Password must be provided!" });
    if (password.length < 5) return res.status(400).json({ error: "Password must be at least 5 characters long." });
    if (!full_name) return res.status(400).json({ error: "Full Name is required!" });
    if (password !== confirm_password) return res.status(400).json({ error: "Password and confirmed password do not match!" });

    // Check for duplicate email
    const getDuplicateEmail = await usersModel.findOne({ email: email });
    if (getDuplicateEmail) return res.status(400).json({ error: "This email already exists!" });

    // Hash the password
    //use more rounds to hash between 10 and 12.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
   const createdUser = await usersModel.create({
      full_name: full_name,
      email: email,
      password: hashedPassword,
      balance: balance,
    });

    const accessToken =  jwtManager(createdUser);

    res.status(201).json({ 
      status: "User registered successfully!", 
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = register;
