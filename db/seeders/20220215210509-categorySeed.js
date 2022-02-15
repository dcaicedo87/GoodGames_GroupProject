'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
          "Categories",
          [
            {   genre: "Action/Adventure", createdAt: new Date(), updatedAt: new Date() },
            {   genre: "RPG", createdAt: new Date(), updatedAt: new Date()              },
            {   genre: "MMO", createdAt: new Date(), updatedAt: new Date()              },
            {   genre: "Horror", createdAt: new Date(), updatedAt: new Date()           },
            {   genre: "Sport/Sim", createdAt: new Date(), updatedAt: new Date()        },
            {   genre: "Strategy/RTS", createdAt: new Date(), updatedAt: new Date()     },
            {   genre: "Casual/Sandbox", createdAt: new Date(), updatedAt: new Date()   }
          ],
          {}
        );
      },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  }
};
