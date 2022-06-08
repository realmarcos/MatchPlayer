// eslint-disable-next-line import/no-import-module-exports
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("Partidas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "pending", // pendente, em andamento, finalizado e calcelado
      },
      note: {
        type: DataTypes.STRING,
      },
      userIdCreated: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      localId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      sportId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      day: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      startHour: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      endHour: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      limitUsers: {
        type: DataTypes.INTEGER,
      },
      countUsers: {
        type: DataTypes.INTEGER,
      },
      isPublic: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("Partidas");
  },
};
