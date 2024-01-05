const ActivityDB = require("../models").Activity
const SubjectDB = require("../models").Subject

const checkAvailability = (startDate,endDate) => {
    if (startDate < Date.now && endDate > Date.now) {
        return true
    }
    return false
}

const activityController = {
    getAllActivities: async (req, res) => {
        try {
            let activities = await ActivityDB.findAll()
            if (!activities.length) {
                return res.status(404).send("No activities existing yet!");
            } 
            return res.status(200).send(activities)
        } catch (err) {
            return res.status(500).send({ message: "Server error!" });
        }
    },
    getActivityById: async (req, res) => {
        let activityId = req.params.activityId
        try {
            let activity = await ActivityDB.findOne({ where: { activityId } })
            if (!activity) {
                return res.status(404).send({message:"activity does not exist"})
            }
             if (!checkAvailability(activity.startDate, activity.endDate)) {
                activity.isActive = false
                await activity.save()
            }
            activity.isActive = true
            await activity.save()
            return res.status(200).send(activity)
        } catch (err) {
            return res.status(500).send({ message: "Server error!" });
        }
    },
    addActivity: async (req, res) => {
        try {
            let {
                name, startDate,description,accessCode,endDate,subjectId
            } = req.body
            if (startDate > endDate) {
                return res.status(404).send("starting date should be before ending date")
            }
            isActive=checkAvailability(startDate,endDate)
            let activity = await ActivityDB.create({ ...req.body, isActive, subjectId})
            return res.status(201).send({ message: "activity created" }, activity)
        } catch (err) {
            return res.status(500).send({ message: "Server error!" });
        }
    },
    updateActivity: async (req, res) => {
        try {
            let { activityId } = req.params
            if (!activityId) {
                return res.status(400).send("invalid id")
            }
            let activity = await ActivityDB.findByPk(activityId)
            if (!activity) {
                return res.status(404).send("activity does not exist")
            }
            await activity.update({ ...req.body })
            activity = await activity.save()
            return res.status(200).send({ message: "activity updated" }, activity)
        } catch {
            return res.status(500).send({ message: "Server error!" });
        }
    },
    deleteActivity: async (req, res) => {
        let { activityId } = req.params;
        try {
            let activity = await ActivityDB.findByPk(activityId);
            if (!activity) {
                return res.status(404).send({ message: `activity does not exist` });
            }
            await activity.destroy();
            return res.status(200).send("activity deleted");
        } catch (err) {
            return res.status(500).send({ message: "Server Error!" });
        }
    },
    getActivitiesBySubject: async (req, res) => {
        try {
            const subjectName = req.params.subjectName;
            if (!subjectName) {
                return res.status(400).send("provide a name")
            }
            const subject = await SubjectDB.findOne({
              where: { name:subjectName },
            });
            if(!subject) {
                return res.status(404).send({ message: `subject does not exist` });
            }
            const activities = await ActivityDB.findAll({
              where: { subjectId: subject.id },
            });
            return res.status(200).send(activities)
          } catch (error) {
            return res.status(500).send({ message: "Server Error!" });
          }
    },
    tryAccessCode: async (req, res,next) => {
        try {
            let { activityId } = req.params;
            if (!activityId) {
                return res.status(400).send("provide an activity id")
            }
            let activity = await ActivityDB.findByPk(activityId)
            if (!activity) {
                return res.status(404).send("activity does not exist")
            }
            if (!checkAvailability(activity.startDate, activity.endDate)) {
                activity.isActive = false
                await activity.save()
                return res.status(404).send({ message: `the code is not longer available`},false);
            }
            activity.isActive = true
            await activity.save()
            let { accessCode } = req.body
            if (!activity.accessCode == accessCode) {
                return res.status(404).send({ message: `code is wrong`},false);
            }
            next()
        } catch (err) {
            return res.status(500).send({ message: "Server Error!" });
        }
    }
    
}

module.exports = activityController
