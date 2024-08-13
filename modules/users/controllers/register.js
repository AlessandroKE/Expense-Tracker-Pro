const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer')

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

  /*   var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "imranabdi2704@gmail.com",
        pass: "exghoikktolvolgw"
      }
    });
 */

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "795825fe7c7634",
        pass: "f54ff3719a6e47"
      }
    });

    await transport.sendMail({
      to: createdUser.email,
      from: "support@expense.tracker.com",
      subject: "Welcome to Expense Tracker Pro!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 600px; margin: auto;">
            <h1 style="color: #007bff; font-size: 24px;">Hi ${createdUser.full_name},</h1>
            <h2 style="color: #333; font-size: 20px;">Welcome to Expense Tracker Pro!</h2>
            <p style="font-size: 16px; color: #333;">
              We're excited to have you on board. With Expense Tracker Pro, you'll be able to easily manage your expenses, track your income, and get a clearer picture of your financial health.
            </p>
            <p style="font-size: 16px; color: #333;">
              If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:support@expense.tracker.com" style="color: #007bff;">support@expense.tracker.com</a>.
            </p>
            <p style="font-size: 16px; color: #333;">
              Happy tracking!
            </p>
            <p style="font-size: 16px; color: #333;">
              Best regards,<br>
              The Expense Tracker Pro Team
            </p>
          </div>
        </div>
  `
    });
    

    res.status(201).json({ 
      status: "User registered successfully!", 
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = register;
