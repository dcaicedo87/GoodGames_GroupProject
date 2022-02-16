'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Users",
            [
              { username: "Greg", hashedPass: '$2a$11$gmn8qzd2blhMhIM20b6B4uWshNUbIOeifmEl0grjiLqcOUNdZvm9O', email: 'master@gmail.com', createdAt: new Date(), updatedAt: new Date()},
            ],
          {}
        );
      },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
