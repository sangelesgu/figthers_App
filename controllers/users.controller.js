const mongoose = require ('mongoose');
const Users = require('../models/users.model');
const auth = require('./auth.controller');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const {body} = require('express-validator');

const rutaAbsoluta = path.join(__dirname.replace('controllers', ''), './config/secrets.json')
const secretsContents = fs.readFileSync(rutaAbsoluta);
const secrets = JSON.parse(secretsContents);

mongoose.connect(
    secrets.mongo_login,
    { useUnifiedTopology: true, useNewUrlParser: true }
)


// Function for create a new user:

exports.createUser = (req, res)=>{

    Users.find({$or:[{username:req.body.username}, 
    {email: req.body.email}]},
    (error, result)=>{
        if (error) throw error; 
        if (result.length !== 0){
            res.send({"Error": "User already exits."})
        } else {
            const date = new Date(); 
    bcrypt.hash(
        req.body.password, 
        14,
        (error, hash)=>{
            if(error) throw error; 
            const user = {
                "_id": mongoose.Types.ObjectId(),
                "avatar": req.body.avar,
                "username": req.body.username,
                "email": req.body.email,
                "password": hash,
                "registrationDate":date,
                "name": req.body.name,
                "lastName": req.body.lastName,
                "age": req.body.age,
                "gender": req.body.gender,
                "cancer": req.body.cancer,
                "cancerType": req.body.cancerType
            }        
            const newUser = new Users  (user);
            newUser.save((error, result)=>{
                if(error) throw error;
                res.send({"message": "User created", "_id": result._id})
            })
        })  

        }
    })
    
};  


// List of all Users:
exports.listOfUsers = (req, res)=>{
    Users.find( (error, users) =>{
        if(error) throw error;
        res.send(users)
    })
};


// One user : 
exports.getOneUser = (req, res)=>{
 
            const id = req.params.id;
            Users.findById(id, (error, result)=>{
                if (error) throw error; 
                res.send(result)
            })
        
};


// Update User: 
exports.updateUser = (req, res)=>{
    let id = req.params.id
            const user = req.body
            Users.findByIdAndUpdate(
                id,
                {$set: user},
                (error, result)=>{
                    if(error) throw error;
                    res.send({"Message": "User update!"})
                })
        
};

exports.deleteUser = (req, res)=>{
    auth.checkToken(
        req,res,
        (req,res)=>{
            const id = req.params.id;
            Users.findByIdAndDelete(id, (error, result)=>{
                if(error) throw error; 
                res.send(result);
            })
        })
};