const models = require('../models')
const Rooms = models.rooms


exports.index= (req, res)=>{
    Rooms.findAll().then(rooms=>res.send(rooms))
}

exports.store = (req, res) => {
    Rooms.create(
        req.body
    ).then(rooms => {
        if(rooms){
            res.send({
                message: 'Success created room',
                rooms
            })
        }else{
            return res.send({
                message: 'Error to create room',
            })
        }        
    })
}

exports.update = (req, res) => {
    // console.log(req.params)
    Rooms.update(
        req.body,
        {where:{
            id:req.params.room_id
        }
    }).then(rooms=>{
        if(rooms){
            res.send({
                message:"Success updated Rooms",
            })
        }else{
            res.send({
                message:"Error to update Rooms"
            })
        }
        
    })
}

exports.remove = (req, res)=> {
    Rooms.destroy({
        where:{
            id:req.params.room_id
        }
    }).then(rooms=>{
        if(rooms){
            res.send({
                message: 'Success deleted room',
            })
        }else{
            res.send({
                message: 'Error to delete room'
            })
        } 
    })
}
