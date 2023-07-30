const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();
const inventoryController = require("../controller/inventoryController")

router.post("/createInventory",auth,inventoryController.createInventory)

//Get all blood records
router.get("/getInventory",auth,inventoryController.getInventory)

// Get recent blood records
router.get("/getRecentInventory",auth,inventoryController.getRecentInventory)

// Get Hospital Blood Records 
router.post("/getInventoryHospital",auth,inventoryController.getInventoryHospital)

//Get donor records
router.get("/getDonors",auth,inventoryController.getDonors)

//Get hospitals records
router.get("/getHospitals",auth,inventoryController.getHospitals)

//Get organisaton records
router.get("/getOrganisations",auth,inventoryController.getOrgnaisationController)

//Get organistion for hospital
router.get("/getOrganisationsForHospital",auth,inventoryController.getOrgnaisationForHospitalController)

exports.router = router;