
const Auth = require("../models/authModel");

const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const token = req.header("authorization");

    if (!token) {
        res.status(400).json({ message: "Please login" });
    }



    const splitedToken = token.split(" ")
    const realToken = splitedToken[1];
    const decodedToken = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`);

    if (!decodedToken) {
        res.status(404).json({ message: "Please login" });
    }

    const user = await Auth.findById(decodedToken.user._id);
    if (!user) {
        res.status(404).json({message: "No user account found"})
    }

    req.user = user;

    next();
};


module.exports = authMiddleware;
