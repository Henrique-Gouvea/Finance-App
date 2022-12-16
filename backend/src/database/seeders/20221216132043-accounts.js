'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('accounts', [
      {
        id: '1',
        balance: '70',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2',
        balance: '130',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '3',
        balance: '100',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {});
  }
};
