'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Gameshelves",
            [
              { name: "Good Games", userId: 1, createdAt: new Date(), updatedAt: new Date()},
            ],
          {}
        );
      },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Gameshelves', null, {});

  }
};
