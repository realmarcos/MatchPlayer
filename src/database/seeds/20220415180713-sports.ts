// eslint-disable-next-line import/no-import-module-exports
import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Sports", [{
      name: "Futebol",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert("Sports", [{
      name: "Vôlei",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete("Sportes", {});
  },
};
