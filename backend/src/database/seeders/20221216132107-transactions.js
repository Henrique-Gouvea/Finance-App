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
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000)
      },
      {
        id: 2,
        debited_account_id: 1,
        credited_account_id: 2,
        value: 15,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        debited_account_id: 1,
        credited_account_id: 2,
        value: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
