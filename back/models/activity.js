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
            type:DataTypes.STRING,
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
      },
      {
        freezeTableName: true,
        
      }
    );
    return activity;
  }
  