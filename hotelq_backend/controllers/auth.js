const jwt = require('jsonwebtoken')
const md5 = require('md5')
const models = require('../models')
const User = models.users

exports.index = (req, res) => {
    User.findAll().then(users=>res.send(users))
}

exports.getUser = (req, res) => {
    User.findOne({
        where:{
            id:req.params,id
        }
    }).then(users=>res.send(users))
}

exports.login = (req, res) => {
    const email= req.body.email
    const password = md5(req.body.password)
    // const password = req.body.password

    User.findOne({where:{email, password}}).then(user=>{
        if(user){
            const token = jwt.sign({ userId: user.id}, 'my-secret-key')
            res.send({
                // message: "Success logged in",
                username:user.username,
                password: user.password,
                // email:user.email,
                // id : user.id,
                token: token
            })
        }else{
            res.send({
                error: true,
                message:"wrong email or password!"
            })
        }
    })
}

exports.register = (req, res) => {
    User.findOne(
        {where:{email:req.body.email}}).then(user=>{
            if(user) {
                return res.send({message:"The email address "+req.body.email+" already exist"})
            }else{                
                User.create({
                    username:req.body.username,
                    email:req.body.email,
                    password: md5(req.body.password),
                    image:"https://via.placeholder.com/1080"
                    // password: req.body.password
                }).then(user => {
                    if(user){
                        const token = jwt.sign({ userId: user.id}, 'my-secret-key')
                        res.send({
                            response:{
                                message:"Success registered user",
                                username:user.username,
                                email:user.email,
                                token: token
                            }
                        })
                    }else{
                        res.send({
                            error: true,
                            message:"something wrong!"
                        })
                    }
                })
            }
        })
    
}
