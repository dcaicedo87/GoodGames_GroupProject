'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gamejoin = sequelize.define('Gamejoin', {
    gameId: DataTypes.INTEGER,
    gameShelfId: DataTypes.INTEGER
  }, {});
  Gamejoin.associate = function(models) {
    Gamejoin.belongsTo(models.Game, { foreignKey: 'gameId'})
    Gamejoin.belongsTo(models.Gameshelf, { foreignKey: 'gameShelfId'})
  };
  return Gamejoin;
};
