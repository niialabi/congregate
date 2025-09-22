"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const membersTable = await queryInterface.describeTable("members");
      if (!membersTable.gender) {
        await queryInterface.addColumn(
          "members",
          "gender",
          {
            type: Sequelize.ENUM("M", "F", "Other"),
            allowNull: true,
          },
          { transaction },
        );
      }
      if (!membersTable.demographic) {
        await queryInterface.addColumn(
          "members",
          "demographic",
          {
            type: Sequelize.ENUM("Y", "M", "W"),
            allowNull: true,
          },
          { transaction },
        );
      }

      await queryInterface.createTable(
        "attendance",
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          memberId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "members",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          date: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          present: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
        },
        {
          transaction,
          indexes: [
            {
              fields: ["memberId"],
            },
            {
              fields: ["date"],
            },
          ],
        },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("attendance", { transaction });
      await queryInterface.removeColumn("members", "gender", { transaction });
      await queryInterface.removeColumn("members", "demographic", {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
