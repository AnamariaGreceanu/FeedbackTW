const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")

router.route("/register")
    .post(userController.addUser)
router.route("")
    .get(userController.getAllUsers)
router.route("/:userId")
    .get(userController.getUserById)
    .delete(userController.deleteUser)
router.route("/login/:role(teacher|student)")
    .post(userController.loginUser)

module.exports=router

