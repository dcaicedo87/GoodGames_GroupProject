'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        "Reviews",
        [
          { content: "Game Good", userId: 1, gameId: 3, createdAt: new Date(), updatedAt: new Date()},
          { content: "WHY THIS GMEA BAD?!", userId: 1, gameId: 4, createdAt: new Date(), updatedAt: new Date()},
          { content: "Meh?", userId: 1, gameId: 2, createdAt: new Date(), updatedAt: new Date()},
          { content: "This isn't publix", userId: 1, gameId: 1, createdAt: new Date(), updatedAt: new Date()},
        ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
