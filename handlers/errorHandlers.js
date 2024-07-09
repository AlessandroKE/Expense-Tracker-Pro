const errorHandlers = (error, req, res, next) => {
    if (error) {
        res.status(400).json({
            status: 'Failed',
            error: error.message || error
        });
    } else {
        next(); // Make sure next is correctly passed in middleware chain
    }
};

module.exports = errorHandlers;
