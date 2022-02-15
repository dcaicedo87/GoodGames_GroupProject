'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gameshelf = sequelize.define('Gameshelf', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Gameshelf.associate = function(models) {
    Gameshelf.belongsTo(models.User, { foreignKey: 'userId' });
    const columnMapping = {
        through: 'Gamejoin',
        otherKey: 'gameId',
        foreignKey: 'gameShelfId'
        }
        Gameshelf.belongsToMany(models.Game, columnMapping);
  };
  return Gameshelf;
};
