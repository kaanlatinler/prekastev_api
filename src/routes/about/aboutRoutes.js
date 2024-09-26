const express = require("express");
const router = express.Router();
const aboutController = require("../../controllers/about/aboutController");

router.get("/getAbouts", aboutController.getAbouts);
router.get("/getAbout/:id", aboutController.getAbout);
router.post("/addAbout", aboutController.addAbout);
router.put("/updateAbout/:id", aboutController.updateAbout);
router.delete("/deleteAbout/:id", aboutController.deleteAbout);

module.exports = router;
