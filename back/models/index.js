const db = require("../config/db")
const {DataTypes} = require("sequelize")

const UserModel = require("./user")
const SubjectModel = require("./subject")
const FeedbackModel = require("./feedback")
const ActivityModel = require("./activity")
const User = UserModel(db, DataTypes)
const Subject = SubjectModel(db, DataTypes)
const Feedback = FeedbackModel(db, DataTypes)
const Activity = ActivityModel(db, DataTypes)

Subject.belongsTo(User,{
    foreignKey:"teacherId"
})
User.hasMany(Subject,{
    foreignKey:"teacherId"
})

Activity.belongsTo(Subject, { foreignKey: 'subjectId' })
Subject.hasMany(Activity, { foreignKey: 'subjectId' })

Feedback.belongsTo(Activity, { foreignKey: 'activityId' })
Activity.hasMany(Feedback, { foreignKey: 'activityId' })

Feedback.belongsTo(User,{
    foreignKey:"studentId"
})
User.hasMany(Feedback,{
    foreignKey:"studentId"
})


module.exports = {
    User,
    Subject,
    Feedback,
    Activity,
}

