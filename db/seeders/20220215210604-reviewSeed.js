'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        "Reviews",
        [
          { content: "Game Good", userId: 1, gameId: 1, createdAt: new Date(), updatedAt: new Date()},
        ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
