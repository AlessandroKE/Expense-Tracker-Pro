const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../manager/emailManager.js");
//const emailManager = require("./manager/emailManager.js"); // Assuming emailManager is in a separate file

const resetPassword = async (req, res) => {
  try {
    const usersModel = mongoose.model("users");
    const { email, newPassword, resetCode } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!resetCode) {
        return res.status(400).json({ message: "Reset code is required" });
    }
    if (!newPassword) {
        return res.status(400).json({ message: "New password is required" });
    }

    const getUserWithResetCode = await usersModel.findOne({
      email: email,
      resetCode: resetCode,
    });

    if (!getUserWithResetCode) {
        return res.status(400).json({ message: 'Reset Code does not match' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await usersModel.updateOne(
      {
        email: email,
      },
      {
        password: hashedPassword,
        resetCode: "",
      },
      {
        runValidators: true,
      }
    );

    // Prepare email content
    const subject = "Password Reset Successful";
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4;">
        <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 600px; margin: auto;">
          <h1 style="color: #007bff; font-size: 24px;">Hi ${getUserWithResetCode.full_name},</h1>
          <h2 style="color: #333; font-size: 20px;">Password Reset Successful</h2>
          <p style="font-size: 16px; color: #333;">
            Your password for the Expense Tracker Pro account has been successfully reset.
          </p>
          <p style="font-size: 16px; color: #333;">
            If you did not initiate this password reset, please contact our support team immediately at <a href="mailto:support@expense.tracker.com" style="color: #007bff;">support@expense.tracker.com</a>.
          </p>
          <p style="font-size: 16px; color: #333;">
            For security reasons, we recommend that you change your password regularly and avoid using the same password across multiple accounts.
          </p>
          <p style="font-size: 16px; color: #333;">
            Thank you for using Expense Tracker Pro!
          </p>
          <p style="font-size: 16px; color: #333;">
            Best regards,<br>
            The Expense Tracker Pro Team
          </p>
        </div>
      </div>
    `;

    // Send email
    await emailManager(
      email,
      "Your password has been reset successfully",
      html,
      subject
    );

    res.status(200).json({
      status: "success",
      message: "Password reset successfully!",
    });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(400).json({
      status: "error",
      message: error.toString(),
    });
  }
};

module.exports = resetPassword;