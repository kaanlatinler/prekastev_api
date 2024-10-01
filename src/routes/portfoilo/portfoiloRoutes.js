const express = require("express");
const router = express.Router();
const portfoiloController = require("../../controllers/portfoilo/portfoiloController");

router.get("/getPortfoilos", portfoiloController.getPortfoilos);
router.get("/getPortfoilo/:id", portfoiloController.getPortfoilo);
router.post("/addPortfoilo", portfoiloController.addPortfoilo);
router.delete("/deletePortfoilo/:id", portfoiloController.deletePortfoilo);
router.put("/updatePortfoilo/:id", portfoiloController.updatePortfoilo);
router.delete("/deleteImage/:id", portfoiloController.deleteImage);

module.exports = router;
