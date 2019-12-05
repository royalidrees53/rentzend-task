'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('Agent', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    number: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    document: DataTypes.STRING,
  }, {});
  return Agent;
};