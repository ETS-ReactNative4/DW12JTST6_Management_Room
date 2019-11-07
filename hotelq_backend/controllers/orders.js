// const connection = require('../config/db')
const moment = require('moment')
const models = require('../models')
const Customers = models.customers
const Rooms = models.rooms
const Orders = models.orders


// exports.index = (req, res) => {
//     connection.query("SELECT o.id as order_id, o.customer_id, r.id, r.name, o.is_booked, o.is_done, o.duration, o.order_end_time FROM rooms r LEFT JOIN orders o ON r.id=o.room_id GROUP BY name",(err, rows)=>{

//       if(err)throw err
//       res.send(rows)
//     })
//   };

exports.index = async (req, res) => {
  Rooms.findAll({
    include: [
      {
        model: Orders,
        as: 'orders',
        include: [
          {
            model: Customers,
            as: 'customer',
          },
        ],
      },
    ],
  }).then(rooms => res.send(rooms));
}

exports.store = (req, res) => {
    moment.locale('id');
    const {room_id, customer_id, duration} = req.body;
    const startdate = moment().format();
    let end_date_time = moment(startdate)
      .add(duration, 'minutes')
      .format();
    Orders.create({
      room_id: room_id,
      customer_id: customer_id,
      duration: duration,
      order_end_time: end_date_time,
      is_booked: true,
      is_done: false,
    }).then(order => {
      res.send(order);
    });
  };

// exports.checkout = (req, res) => {
//   Orders.update(
//     req.body,
//     {where:{
//           id:req.params.order_id
//       }
//   }).then(orders=>{
//       if(orders){
//           res.send({
//               message:"Success updated orders",
//               orders
//           })
//       }else{
//           res.send({
//               message:"Error to update orders"
//           })
//       }
//   })
// }
exports.checkout = (req, res) => {
  Orders.destroy({where:{id:req.params.order_id}
  }).then(orders=>{
      if(orders){
          res.send({
              message:"Success deleted orders",
              orders
          })
      }else{
          res.send({
              message:"Error to delete orders"
          })
      }
  })
}