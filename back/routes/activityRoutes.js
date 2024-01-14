const express = require('express')
const router = express.Router()
const activityController = require("../controllers/activityController")

router.route("")
    .post(activityController.addActivity)
    .get(activityController.getAllActivities)
router.route("/:activityId")
    .get(activityController.getActivityById)
    .patch(activityController.updateActivity)
    .delete(activityController.deleteActivity)
router.route("/checkAccesCode/:activityId")
    .post(activityController.checkAccessCode)
router.route("/getActivities/:subjectName/:subjectType")
    .get(activityController.getActivitiesBySubject)
module.exports=router

