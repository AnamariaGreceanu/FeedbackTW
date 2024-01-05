const FeedbackDB = require("../models").Feedback
const ActivityDB = require("../models").Activity

const feedbackController = {
    getAllFeedbacks: async (req, res) => {
        try {
            let feedbacks = await FeedbackDB.findAll()
            if (!feedbacks.length) {
                return res.status(404).send("No feedbacks existing yet!");
            } 
            return res.status(200).send(feedbacks)
        } catch (err) {
            return res.status(500).send({ message: "Server error!" });
        }
    },
    getFeedbackById: async (req, res) => {
        let feedbackId = req.params.feedbackId
        try {
            let feedback = await FeedbackDB.findOne({ where: { feedbackId } })
            if (!feedback) {
                return res.status(404).send({message:"feedback does not exist"})
             }
            return res.status(200).send(feedback)
        } catch (err) {
            return res.status(500).send({ message: "Server error!" });
        }
        
    },
    addFeedback: async (req, res) => {
        try {
            let {
                countSmiley,countFrowny,countSurprised,countConfused,activityId
            } = req.body
            let feedback = await FeedbackDB.create({ ...req.body, studentId:req.user})
            return res.status(201).send({ message: "feedback created" }, feedback)
        } catch (err) {
            return res.status(500).send({ message: "Server error!" });
        }
    },
    updateFeedback: async (req, res) => {
        try {
            let { feedbackId } = req.params
            if (!feedbackId) {
                return res.status(400).send("invalid id")
            }
            let feedback = await FeedbackDB.findByPk(feedbackId)
            if (!feedback) {
                return res.status(404).send("feedback does not exist")
            }
            if (feedback.userId != req.user) {
                return res.status(403).send("access forbidden")
            }
            await feedback.update({ ...req.body })
            feedback = await feedback.save()
            return res.status(200).send({ message: "feedback updated" }, feedback)
        } catch {
            return res.status(500).send({ message: "Server error!" });
        }
    },
    deleteFeedback: async (req, res) => {
        let { feedbackId } = req.params;
        try {
            let feedback = await FeedbackDB.findByPk(feedbackId);
            if (!feedback) {
                return res.status(404).send({ message: `feedback does not exist` });
            }
            await feedback.destroy();
            return res.status(200).send("feedback deleted");
        } catch (err) {
            return res.status(500).send({ message: "Server Error!" });
        }
    },
    getFeedbacksByActivity: async (req, res) => {
        try {
            const activityName = req.params.activityName;
            if (!activityName) {
                return res.status(400).send("provide a name")
            }
            const activity = await ActivityDB.findOne({
              where: { name:activityName },
            });
            if(!activity) {
                return res.status(404).send({ message: `activity does not exist` });
            }
            const feedbacks = await FeedbackDB.findAll({
              where: { activityId: activity.id },
            });
            return res.status(200).send(feedbacks)
        } catch (error) {
            return res.status(500).send({ message: "Server Error!" });
        }
    }
    
}

module.exports = feedbackController
