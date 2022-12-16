'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('transactions', [
      {
        id: 1,
        debited_account_id: 1,
        credited_account_id: 2,
        value: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        debited_account_id: 1,
        credited_account_id: 2,
        value: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        debited_account_id: 1,
        credited_account_id: 2,
        value: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
