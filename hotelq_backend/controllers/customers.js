const models = require('../models')
const Customers = models.customers


exports.index= (req, res)=>{
    Customers.findAll().then(customers=>res.send(customers))
}

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
