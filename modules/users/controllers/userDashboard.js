


const userDashboard = async (req, res) => {

    console.log(req.user);


    res.status(200).json({
        status: "Hello from user dashboard"
    })
}


module.exports = userDashboard;