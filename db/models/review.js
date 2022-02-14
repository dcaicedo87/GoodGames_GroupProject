'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Game, { foreignKey: 'gameId' });
    Review.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Review;
};
