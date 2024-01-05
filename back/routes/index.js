const express = require("express")
const router = express.Router()

const userRouter=require("./user")
const subjectRouter=require("./subject")
const activityRouter=require("./activity")
const feedbackRouter = require("./feedback")
const dbRouter = require("./db")

router.use("/user", userRouter)
router.use("/subject", subjectRouter)
router.use("/activity", activityRouter)
router.use("/feedback", feedbackRouter)
router.use("/", dbRouter)

module.exports = router
