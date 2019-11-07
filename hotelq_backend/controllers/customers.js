const models = require('../models')
const Customers = models.customers
const fs = require('fs');


exports.index= (req, res)=>{
    Customers.findAll().then(customers=>res.send(customers))
}

exports.getCustumerById= (req, res)=>{
    Customers.findOne({
        where:{
            id:req.params.id        
    }}).then(customers=>res.send(customers))
}

// exports.store = (req, res)=>{
//     const data = {
// 	"name": req.body.name,
// 	"identity_number": req.body.identity_number,
// 	"phone_number": req.body.phone_number,
// 	"image": req.file.path,
//     }
//     try{
//         Customers.create(data).then(customers=>{
//             if(customers){
//                 res.send({
//                     message:"Success created customers",
//                     customers
//                 })
//             }else{
//                 res.send({
//                     message:"Error to create customers"
//                 })
//             }
//         })
//     }catch(err){
//         res.send({
//             err,
//             req:data
//         })
//     }
// }

exports.store = (req, res) => {
    Customers.create(
        req.body
    ).then(customers => {
        if(customers){
            res.send({
                message: 'Success created customer',
                customers
            })
        }else{
            return res.send({
                message: 'Error to create customer',
            })
        }        
    })
}

exports.update = (req, res) => {
    // console.log(req.params)
    Customers.update(
        req.body,
        {where:{
            id:req.params.customer_id
        }
    }).then(customers=>{
        if(customers){
            res.send({
                message:"Success updated customers",
            })
        }else{
            res.send({
                message:"Error to update customers"
            })
        }
        
    })
}

exports.remove = (req, res)=> {
    Customers.destroy({
        where:{
            id:req.params.customer_id
        }
    }).then(customers=>{
        if(customers){
            res.send({
                message: 'Success deleted customer',
            })
        }else{
            res.send({
                message: 'Error to delete customer'
            })
        } 
    })
}
