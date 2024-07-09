const express = require('express');
const app = express();
const errorHandlers = require('./handlers/errorhandlers');

// Other routes and middleware
// app.use(...)
app.use(express.json());

// Error handling middleware should be defined last
app.use(errorHandlers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} `);
});
