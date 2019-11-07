'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    name: DataTypes.STRING,
  }, {});
  rooms.associate = function(models) {
    // associations can be defined here
    rooms.hasMany(models.orders, {
      foreignKey: 'room_id',
      as: 'orders',
    });
  };
  return rooms;
};