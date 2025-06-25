
const express = require("express");
const { handleUserLogin, handleUserRegistration, HandleGetAllUser } = require("../controller/authController");
const authMiddleware = require("../middlewares");




const router = express.Router();



// user can register
router.post("/auth/register", handleUserRegistration);

// user login
router.post("/auth/login", handleUserLogin);


// get all user
router.get("/users", authMiddleware, HandleGetAllUser);





module.exports = router;