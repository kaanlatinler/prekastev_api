const express = require("express");
const router = express.Router();
const faqController = require("../../controllers/faq/faqController");

router.get("/getFaqs", faqController.getQuestions);
router.get("/getFaq/:id", faqController.getQuestion);
router.post("/addFaq", faqController.addQuestion);
router.put("/updateFaq/:id", faqController.updateQuestion);
router.delete("/deleteFaq/:id", faqController.deleteQuestion);

module.exports = router;
