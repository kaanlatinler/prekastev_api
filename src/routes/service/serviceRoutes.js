const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/service/serviceController");

router.get("/getServices", serviceController.getServices);
router.get("/getService/:id", serviceController.getService);
router.post("/addService", serviceController.addServices);
router.put("/updateService/:id", serviceController.updateServices);
router.delete("/deleteService/:id", serviceController.deleteServices);

module.exports = router;
