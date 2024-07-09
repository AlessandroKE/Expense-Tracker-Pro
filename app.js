const express = require('express');
const app = express();
const errorHandlers = require('./handlers/errorhandlers');
const mongoose = require('mongoose');

require('dotenv').config();

// Other routes and middleware
// app.use(...)
app.use(express.json());

mongoose.connect(process.env.mongo_connection,{}).then(()=>{
    console.log('Connection is established');
}).catch(() => {
    console.log('Mongo connection failed')
})

// Error handling middleware should be defined last
app.use(errorHandlers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} `);
});
