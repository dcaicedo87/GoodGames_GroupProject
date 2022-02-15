'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    genre: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Game, { foreignKey: 'genreId' });
  };
  return Category;
};
