const express = require("express");
const router = express.Router();
const stepController = require("../../controllers/steps/stepController");

router.get("/getSteps", stepController.getSteps);
router.get("/getStep/:id", stepController.getStep);
router.post("/addStep", stepController.addStep);
router.put("/updateStep/:id", stepController.updateStep);
router.delete("/deleteStep/:id", stepController.deleteStep);

module.exports = router;
