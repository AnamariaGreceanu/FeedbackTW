module.exports = (db, DataTypes) => {
    const activity = db.define(
      "activity",
      {
        activityId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        startDate:{
            type:DataTypes.DATE,
            allowNull: false,
        },
        description:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        accessCode:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        endDate:{
            type:DataTypes.DATE,
            allowNull: false,
        },
        isActive:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        },
        // subjectId:{
        //     type:DataTypes.INTEGER,
        //     allowNull: true,
        // },
      },
      {
        freezeTableName: true,
        
      }
    );
    return activity;
  }
  