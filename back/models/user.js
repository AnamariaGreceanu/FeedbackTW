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
        unique: true,
        validate: {
          len: [3, 50]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 50]
        }
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
