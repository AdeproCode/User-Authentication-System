require("dotenv").config();
const Auth = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user create an account
const handleUserRegistration = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        

        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: "User account already exist"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 12);
        
        const newUser = new Auth({
            firstName, lastName, email, password: hashedPassword
        });
        await newUser.save();



        res.status(201).json({
            message: "User account created successfully",
            firstName,
            lastName,
            email
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}; 


// user login to their account
const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Auth.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "No account found"
            });
        }
    
        const isMatch = await bcrypt.compare(password, user?.password);
        if (!isMatch) {
            res.status(400).json({ message: "Email or password does not correct" });
        }


        const accessToken = jwt.sign(
            { user },
            process.env.ACCESS_TOKEN,
            { expiresIn: "20m" }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN,
            { expiresIn: "7d" }
        );


        res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.email
            },
            refreshToken
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// get all user account
const HandleGetAllUser = async (req, res) => {
    try {
        
        const allUser = await Auth.find();
        if (!allUser) {
            res.status(400).json({ message: "No user found" });
        }


        res.status(200).json({
            message: "All user found",
            allUser
        })


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = { handleUserRegistration, handleUserLogin, HandleGetAllUser };