'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gamejoin = sequelize.define('Gamejoin', {
    gameId: DataTypes.INTEGER,
    gameShelfId: DataTypes.INTEGER
  }, {});
  Gamejoin.associate = function(models) {
    // associations can be defined here
  };
  return Gamejoin;
};
