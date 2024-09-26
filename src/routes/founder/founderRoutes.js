const express = require("express");
const router = express.Router();
const founderController = require("../../controllers/founder/founderController");

router.get("/getFounders", founderController.getFounders);
router.post("/addFounder", founderController.addFounder);
router.put("/updateFounder/:id", founderController.updateFounder);
router.delete("/deleteFounder/:id", founderController.deleteFounder);

module.exports = router;
