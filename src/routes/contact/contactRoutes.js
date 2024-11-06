const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contact/contactController");

router.get("/getContacts", contactController.getContacts);

router.post("/sendMail", contactController.sendMail);
router.post("/sendMailKaputas", contactController.sendMailKaputas);

module.exports = router;
