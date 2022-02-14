'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    hashedPass: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Review, {foreignKey: 'userId'})
    User.hasMany(models.Gameshelf, {foreignKey: 'userId'})
  };
  return User;
};
