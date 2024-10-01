const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/userController");

router.get("/getUsers", userController.getUsers);
router.get("/getUser/:id", userController.getUser);
router.post("/addUser", userController.addUser);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
