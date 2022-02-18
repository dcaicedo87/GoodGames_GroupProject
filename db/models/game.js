'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    title: DataTypes.STRING,
    releaseDate: DataTypes.STRING,
    developer: DataTypes.STRING,
    metaScore: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Game.associate = function(models) {
    Game.belongsTo(models.Category, { foreignKey: 'genreId' });
    Game.hasMany(models.Review, { foreignKey: 'gameId' });
    const columnMapping = {
        through: 'Gamejoin',
        otherKey: 'gameShelfId',
        foreignKey: 'gameId'
        }
        Game.belongsToMany(models.Gameshelf, columnMapping);
  };
  return Game;
};
