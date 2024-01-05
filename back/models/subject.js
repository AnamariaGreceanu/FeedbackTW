module.exports = (db, DataTypes) => {
    const subject = db.define(
      "subject",
      {
        subjectId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        typeOfSubject:{
          type:DataTypes.ENUM("course","seminar"),
          allowNull: false,
        }
      },
      {
        freezeTableName: true,
      }
    );
    return subject;
  }
  