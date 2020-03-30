

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/users.model');
const Specialists = require('../models/specialist.model');
const path = require('path');
const fs = require('fs');
const {body} = require('express-validator');


const rutaAbsoluta = path.join(__dirname.replace('controllers', ''), './config/secrets.json')
const secretsContents = fs.readFileSync(rutaAbsoluta);
const secrets = JSON.parse(secretsContents);


// Login for users and specialist: 

exports.login = (req, res)=>{
    if (req.params.type === "users") { 
        Users.find({$or:[{username: req.body.username},
            {email: req.body.email}]},
            (error, users)=>{
                if (error) throw error;
                if(users.length === 0){
                    res.send({"Error": "User or email don't exist"})
                } else {
                    bcrypt.compare(
                        req.body.password,
                        users[0].password,
                        (error, coincidence)=>{
                            if(error) throw error;
                            if(coincidence){
                                jwt.sign(
                                    {"username": users[0].username},
                                    secrets.jwt_clave,
                                    (error, token)=>{
                                        if (error) throw error;
                                        res.cookie('green', token)
                                        res.send({"Message": "Welcome!", "token": token, user:users[0]})
                                    })
                            } else {
                                res.send({"Error": "Password incorrect!"})
                            }
                        })
                }
            })
    } else {
        req.params.type === "specialist";
        Specialists.find({$or:[{username: req.body.username},
            {email: req.body.email}]},
            console.log(req.body),
            (error, specialists)=>{
                if (error) throw error;
                if(specialists.length === 0){
                    res.send({"Error": "User or email don't exist"})
                } else {
                    bcrypt.compare(
                        req.body.password,
                        specialists[0].password,
                        (error, coincidence)=>{
                            if(error) throw error;
                            if(coincidence){
                                jwt.sign(
                                    {"username": specialists[0].username},
                                    secrets.jwt_clave,
                                    (error, token)=>{
                                        if (error) throw error;
                                        res.cookie('green', token)
                                        res.send({"Message": "Welcome!", "token": token, specialist: specialists[0]})
                                    })
                            } else {
                                res.send({"Error": "Password incorrect!"})
                            }
                        })
                }
            })

    }
}



exports.checkToken = (req, res, callback)=>{

    if(req.cookies["green"]!== undefined){
        jwt.verify(req.cookies['green'],
        secrets.jwt_clave,
        (error, verify)=>{
            if(error) throw error; 
            if(!verify) {
                res.send({"error": "Invalid token"})
                return false;
            } else {
                callback(req,res)
                return true; 
            }
        })
    }
}