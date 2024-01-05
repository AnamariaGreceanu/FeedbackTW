module.exports = (db, DataTypes) => {
    const feedback = db.define(
      "feedback",
        {
        feedbackId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        countSmiley:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        countFrowny:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        countSurprised:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        countConfused:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        createdDateAt:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        activityId:{
            type:DataTypes.INTEGER,
            allowNull: true,
        }
      },
      {
        freezeTableName: true,
      }
    );
    return feedback;
  }
  