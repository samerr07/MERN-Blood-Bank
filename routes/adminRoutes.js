const { getDonorList, getHospitalList, getOrganisationList, deleteDonor, deleteHospital, deleteOrganisation } = require("../controller/adminController");
const { adminAuth } = require("../middleware/adminMiddleware");
const { auth } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

//Get donor list
router.get("/getDonorList",auth,adminAuth,getDonorList)

//Get hospital list
router.get("/getHospitalList",auth,adminAuth,getHospitalList)

//Get Orgs List
router.get("/getOrganisationList",auth,adminAuth,getOrganisationList)

//Delete Donor 
router.delete("/deleteDonor/:id",auth,adminAuth,deleteDonor);

//Delete Hospital
router.delete("/deleteHospital/:id",auth,adminAuth,deleteHospital);

//Delete Organization
router.delete("/deleteOrg/:id",auth,adminAuth,deleteOrganisation);


exports.router = router;