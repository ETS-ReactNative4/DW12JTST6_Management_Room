'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rooms', [
      {
        name: "A123"
      },
      {
        name: "B123"
      },
      {
        name: "C123"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rooms', null, {});
  }
};
