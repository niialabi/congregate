import { Model } from "sequelize";

export default class Members extends Model {
  static associate(models) {
    // define association here
    this.hasMany(models.Attendance, {
      foreignKey: "memberId",
      as: "attendances",
    });
  }

  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        maritalStatus: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        department: DataTypes.STRING,
        accountStatus: DataTypes.STRING,
        gender: {
          type: DataTypes.ENUM("M", "F", "Other"),
        },
        demographic: {
          type: DataTypes.ENUM("Y", "M", "W"),
        },
      },
      {
        sequelize,
        tableName: "members",
        modelName: "Members",
      },
    );
  }
}
