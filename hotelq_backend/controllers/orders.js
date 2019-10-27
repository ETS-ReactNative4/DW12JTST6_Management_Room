const moment = require('moment');
moment.locale('id');
const models = require('../models')
const Customers = models.customers
const Rooms = models.rooms
const Orders = models.orders


exports.index = (req, res) => {
    Orders.findAll({
      include: [
        {
          model: Customers,
          as: 'customerData',
        },
        {
          model: Rooms,
          as: 'roomData',
        },
      ],
    }).then(orders => res.send(orders));
  };

exports.store = (req, res) => {
    // const {room_id, customer_id, duration} = req.body;
    // const startdate = moment().format();
    // let end_date_time = moment(startdate)
    //   .add(duration, 'minutes')
    //   .format();
    // Orders.create({
    //   room_id: room_id,
    //   customer_id: customer_id,
    //   duration: duration,
    //   order_end_time: end_date_time,
    //   is_booked: true,
    //   is_done: false,
    // }).then(order => {
    //   res.send(order);
    // });
    let now = moment()
    console.log("ISO")
    console.log(now.format());

    console.log("\nTime")
    console.log(now.format("HH:mm:ss"));
    console.log(now.format("h:mm:ss a"));

    console.log("\nDate")
    console.log(now.format("dddd, MMMM Do YYYY"));
    console.log(now.format("YYYY-MM-DD"));

    console.log("\nLocalized")
    console.log(now.format("LT"));
    console.log(now.format("LTS"));
    console.log(now.format("LTS"));
    console.log(now.format("L"));
    console.log(now.format("l"));
  };

exports.update = (req, res) => {
    // console.log(req.params)
    Orders.update(
        req.body,
        {where:{
            id:req.params.order_id
        }
    }).then(orders=>{
        if(orders){
            res.send({
                message:"Success updated orders",
                orders
            })
        }else{
            res.send({
                message:"Error to update orders"
            })
        }
        
    })
}

exports.remove = (req, res)=> {
    Orders.destroy({
        where:{
            id:req.params.orders_id
        }
    }).then(orders=>{
        if(orders){
            res.send({
                message: 'Success deleted order',
                orders
            })
        }else{
            res.send({
                message: 'Error to delete order'
            })
        } 
    })
}
