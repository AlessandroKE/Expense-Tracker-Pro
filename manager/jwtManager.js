const jsonwebtoken = require('jsonwebtoken');

const jwtManager = (user) => {
    try {
        // Check if the JWT secret environment variable is set
        if (!process.env.jwt_salt) {
            throw new Error('JWT_SECRET environment variable is not set.');
        }

        // Create JWT with a secret key and expiration time
        const accessToken = jsonwebtoken.sign(
            { _id: user._id, full_name: user.full_name, email: user.email },
            process.env.jwt_salt, // Use jwt_salt from environment variables
            { expiresIn: '1h' } // Token expiration time
        );

        return accessToken;
    } catch (error) {
        console.error('Error generating JWT:', error.message);
        throw error; // Rethrow the error after logging it
    }
};

module.exports = jwtManager;
