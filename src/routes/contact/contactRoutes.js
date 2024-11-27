const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contact/contactController");

router.get("/getContacts", contactController.getContacts);

router.post("/sendMail", contactController.sendMail);
router.post("/sendMailKaputas", contactController.sendMailKaputas);
router.post("/sendMailyy", contactController.sendMailyy);
router.post("/sendMailContractor", contactController.sendMailContractor);

module.exports = router;
