const getTransactions  = /* async */ (req, res) =>{


    res.status(200).json({
        status: "success",
        message: "Hello from transactions"
    })
}

module.exports = getTransactions;