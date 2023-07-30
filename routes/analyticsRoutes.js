const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router()
const analyticsController = require("../controller/analyticsController")



//routes

//GET BLOOD DATA

router.get("/bloodGroupData",auth,analyticsController.bloodGroupDetails)

exports.router = router