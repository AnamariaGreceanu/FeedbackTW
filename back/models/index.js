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

Subject.belongsTo(User)
User.hasMany(Subject,{
    foreignKey:"teacherId"
})

Activity.belongsTo(Subject)
Subject.hasMany(Activity)

Feedback.belongsTo(Activity)
Activity.hasMany(Feedback)

Feedback.belongsTo(User)
User.hasMany(Feedback,{
    foreignKey:"studentId"
})


module.exports = {
    User,
    Subject,
    Feedback,
    Activity,
}

