const ActivityDB = require("../models").Activity
const SubjectDB = require("../models").Subject
const Op = require("sequelize").Op

const checkAvailability = (startDate, endDate) => {
    let now = new Date()
    if (startDate < now && endDate > now) {
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
            activities = activities.map((activity) => {
                activity.isActive = checkAvailability(
                    (activity.startDate),
                    (activity.endDate)
                );
                return activity;
            });

            await Promise.all(
                activities.map((activity) =>
                    ActivityDB.update(
                        { available: activity.available },
                        { where: { id: activity.id } }
                    )
                )
            );
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
            return res.status(201).send({ message: "activity created", activity })
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
            activity.set({ ...activity.dataValues, ...req.body });
            if (activity.startDate > activity.endDate) {
                return res.status(404).send("starting date should be before ending date")
            }
            activity.isActive=checkAvailability(activity.startDate,activity.endDate)
            
            await activity.update({ ...req.body })
            activity = await activity.save()
            return res.status(200).send({ message: "activity updated", activity })
        } catch(err) {
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
            const subjectType = req.params.subjectType;
            if (!subjectName || !subjectType) {
                return res.status(400).send("provide a name and type of subject")
            }
            const subject = await SubjectDB.findOne({
              where: { [Op.and]: [{ name: subjectName }, { typeOfSubject:subjectType }] },
            });
            if(!subject) {
                return res.status(404).send({ message: `subject does not exist` });
            }
            let activities = await ActivityDB.findAll({
              where: { subjectId: subject.subjectId },
            });
            activities = activities.map((activity) => {
                activity.isActive = checkAvailability(
                    (activity.startDate),
                    (activity.endDate)
                );
                return activity;
            });

            await Promise.all(
                activities.map((activity) =>
                    ActivityDB.update(
                        { available: activity.available },
                        { where: { id: activity.id } }
                    )
                )
            );
           
            return res.status(200).send(activities)
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Server Error!" });
          }
    },
    checkAvailability: async (req, res, next) => {
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
                return res.status(404).send({ message: `the activity is not longer available` });
            }
            activity.isActive = true
            await activity.save()
            next()
        } catch (err) {
            return res.status(500).send({ message: "Server Error!" });
        }
    },
    checkAccessCode: async (req, res, next) => {
        try {
            let { activityId } = req.params;
            if (!activityId) {
                return res.status(400).send("provide an activity id")
            }
            let activity = await ActivityDB.findByPk(activityId)
            if (!activity) {
                return res.status(404).send("activity does not exist")
            }
            let { accessCode } = req.body
            if (activity.accessCode !== accessCode) {
                return res.status(404).send({ message: `code is wrong`});
            }
            return res.status(200).send(true)
        }catch (err) {
            return res.status(500).send({ message: "Server Error!" });
        }
    }
    
}

module.exports = activityController
