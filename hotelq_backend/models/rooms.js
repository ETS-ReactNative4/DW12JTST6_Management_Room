'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    name: DataTypes.STRING,
  }, {});
  rooms.associate = function(models) {
    
  };
  return rooms;
};