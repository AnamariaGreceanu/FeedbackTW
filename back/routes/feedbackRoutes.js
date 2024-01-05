const express = require('express')
const router = express.Router()
const feedbackController = require("../controllers/feedbackController")
const tryAccessCode = require("../controllers/activityController").tryAccessCode

router.route("/:activityId")
    .post(tryAccessCode, feedbackController.addFeedback)
router.route("/:activityId/:feedbackId")
    .patch(tryAccessCode,feedbackController.updateFeedback)
    .delete(tryAccessCode, feedbackController.deleteFeedback)

router.route("")
    .get(feedbackController.getAllFeedbacks)
router.route("/:feedbackId")
    .get(feedbackController.getFeedbackById)
router.route("/getFeedbacks/:activityName")
    .get(feedbackController.getFeedbacksByActivity)


module.exports=router

