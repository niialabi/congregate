import { Model } from "sequelize";

export default class Attendance extends Model {
  static associate(models) {
    // define association here
    this.belongsTo(models.Members, {
      foreignKey: "memberId",
      onDelete: "CASCADE",
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
        memberId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "members",
            key: "id",
          },
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        present: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: "attendance",
        modelName: "Attendance",
        timestamps: false,
      },
    );
  }
}
