'use strict';
module.exports = (sequelize, DataTypes) => {
  const histories = sequelize.define('histories', {
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE,
    customer_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER
  }, {});
  histories.associate = function(models) {
    // associations can be defined here
  };
  return histories;
};