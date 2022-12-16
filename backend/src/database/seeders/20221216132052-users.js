'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        account_id: 1,
        username: 'User',
        cpf: '08120972031',
        email: 'user@gmail.com',
        password: '$2b$05$PEPAGv5E2UUEb4N/xJkuHeHE5.N1X27KjketD/koFWXBh2brTaInG',
        // senha: A1teRew6
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        account_id: 2,
        username: 'User2',
        cpf: '82464914070',
        email: 'user2@gmail.com',
        password: '$2b$05$STF9XPfDjnl3HN6Mfb1ZTe0cOuItEMt0TJ0JHfIIhclqkcxgQA/V.',
        // senha: A1teRew5
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        account_id: 3,
        username: 'User3',
        cpf: '31435176030',
        email: 'user3@gmail.com',
        password: '$2b$05$cXpihLhrrhmkVInM9Tzo1.wp2lB3qH2fgq9nh/wKDRxlAMtmRBNka',
        // senha: A1teRew4
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
