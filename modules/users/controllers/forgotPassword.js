const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
require('dotenv').config(); // Load environment variables

const forgotPassword = async (req, res) => {
    const userModel = mongoose.model('users');

    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required!' });

        const getUser = await userModel.findOne({ email: email });

        if (!getUser) return res.status(400).json({ message: 'Email does not exist' });


        /* Math.random() * 9000 generates a number from 0 (inclusive) to 9000 (exclusive).

            Adding 1000 shifts this range to 1000 (inclusive) to 10000 (exclusive).

            Math.floor() ensures it’s a whole number between 1000 and 9999, inclusive. */
        const resetCode = Math.floor(1000 + Math.random() * 9000);
        const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now




        // Update the user's reset code and expiry
        await userModel.updateOne(
            { 
                email: email 
            }, // Query filter to find the user
            {
                $set: {
                    resetCode: resetCode,
                    resetCodeExpiry: resetCodeExpiry
                }
            },
            {
                runValidators: true
            }
        );

        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transport.sendMail({
            to: getUser.email,
            from: "support@expense.tracker.com",
            subject: "Reset Password Request",
            html: `
             <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4;">
                    <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 600px; margin: auto;">
                        <h1 style="color: #007bff; font-size: 24px;">Hi ${getUser.full_name},</h1>
                        <h2 style="color: #333; font-size: 20px;">Password Reset Request</h2>
                        <p style="font-size: 16px; color: #333;">
                            We received a request to reset your password for your Expense Tracker Pro account.
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            Your reset code is: <strong style="color: #007bff;">${resetCode}</strong>
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            Enter this code in the application to reset your password. This code will expire in 15 minutes from now.
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            If you did not request a password reset, you can safely ignore this email.
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:support@expense.tracker.com" style="color: #007bff;">support@expense.tracker.com</a>.
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            Best regards,<br>
                            The Expense Tracker Pro Team
                        </p>
                    </div>
                </div>

        `
        });



        res.status(200).json({
            status: `Reset code sent to ${email} successfully!`,
            resetCode: resetCode
        });

    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
};

module.exports = forgotPassword;

