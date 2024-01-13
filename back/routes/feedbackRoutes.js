const express = require('express')
const router = express.Router()
const feedbackController = require("../controllers/feedbackController")
const checkAvailability = require("../controllers/activityController").tryAccessCode

router.route("/addFeedback/:activityId")
    .post(checkAvailability, feedbackController.addFeedback)
router.route("/:activityId/:feedbackId")
    .patch(checkAvailability,feedbackController.updateFeedback)
    .delete(checkAvailability, feedbackController.deleteFeedback)

router.route("")
    .get(feedbackController.getAllFeedbacks)
router.route("/getFeedbacks/:activityId")
    .get(feedbackController.getFeedbacksByActivity)
router.route("/:feedbackId")
    .get(feedbackController.getFeedbackById)



module.exports=router

