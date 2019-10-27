'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'vavan@gmail.com',
        password: 'vavan',
        username: 'vavan',
        image :'https://via.placeholder.com/1080',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'irvan@gmail.com',
        password: 'irvan',
        username: 'Irvan',
        image :'https://via.placeholder.com/1080',
        createdAt: new Date(),
        updatedAt: new Date(),

      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
