const models = require('../models')
const Orders = models.orders


exports.index= (req, res)=>{
    Orders.findAll().then(orders=>res.send(orders))
}

exports.store = (req, res) => {
    Orders.create(
        req.body
    ).then(orders => {
        if(orders){
            res.send({
                message: 'Success created order',
                orders
            })
        }else{
            return res.send({
                message: 'Error to create order',
            })
        }        
    })
}

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
