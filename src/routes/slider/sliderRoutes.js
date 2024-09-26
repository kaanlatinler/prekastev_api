const express = require("express");
const router = express.Router();
const sliderController = require("../../controllers/slider/sliderController");

router.get("/getSliders", sliderController.getSliders);
router.get("/getSlider", sliderController.getSlider);
router.post("/addSlider", sliderController.addSlider);
router.put("/updateSlider/:id", sliderController.updateSlider);
router.delete("/deleteSlider/:id", sliderController.deleteSlider);

module.exports = router;
