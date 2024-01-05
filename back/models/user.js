module.exports = (db, DataTypes) => {
  const user = db.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      lastName:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeUser:{
        type: DataTypes.ENUM("teacher","student"),
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
    }
  );
  return user;
}
