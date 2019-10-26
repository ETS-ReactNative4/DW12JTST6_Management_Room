'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    is_done: DataTypes.BOOLEAN,
    is_booked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE,
    customer_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER
  }, {});
  orders.associate = function(models) {
    orders.belongsTo(models.customers,{
      as:'customerData',
      foreignKey:'customer_id',
    }),
    orders.belongsTo(models.rooms,{
      as:'roomData',
      foreignKey:'room_id',
    })
  };
  return orders;
};