const authController = require("../controller/authController")
const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();



router.post("/register",authController.registerController)
router.post("/login",authController.loginUser)
router.get("/currentUser",auth,authController.currentUser)

exports.router = router;