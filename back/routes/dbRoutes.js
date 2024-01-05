const express = require('express')
const router = express.Router()
const dbController = require("../controllers/dbController")

router.get("/reset",dbController.reset)


