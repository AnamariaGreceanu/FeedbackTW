const express = require("express")
const router = express.Router()

const userRouter=require("./userRoutes")
const subjectRouter=require("./subjectRoutes")
const activityRouter=require("./activityRoutes")
const feedbackRouter = require("./feedbackRoutes")
const dbRouter = require("./dbRoutes")

router.use("/user", userRouter)
router.use("/subject", subjectRouter)
router.use("/activity", activityRouter)
router.use("/feedback", feedbackRouter)
router.use("/", dbRouter)

module.exports = router
