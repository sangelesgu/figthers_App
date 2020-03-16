

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



exports.login = (req, res)=>{
    if (req.params.type === "specialist"){
        Specialists.findById(
            req.body._id,
            (error,user)=>{
                if(error) throw error; 
                bcrypt.compare(
                    req.body.password,
                    user.password,
                    (error, coincidence)=>{
                        if (error) throw error; 
                        if (coincidence) {
                            jwt.sign(
                                {"username": user.username},
                                secrets.jwt_clave,
                                (error, token)=>{
                                    if(error) throw error; 
                                    res.cookie('green', token)
                                    res.send({"message": "Bienvenid@!", "token": token})
                                })
                        } else {
                            res.send({"error": "Password incorrect!"})
                        }
                    })
            })

    } else {
        req.parmas == "users";
        Users.findById(
            req.body._id,
            (error,user)=>{
                if(error) throw error; 
                bcrypt.compare(
                    req.body.password,
                    user.password,
                    (error, coincidence)=>{
                        if (error) throw error; 
                        if (coincidence) {
                            jwt.sign(
                                {"username": user.username},
                                secrets.jwt_clave,
                                (error, token)=>{
                                    if(error) throw error; 
                                    res.cookie('green', token)
                                    res.send({"message": "Bienvenid@!", "token": token})
                                })
                        } else {
                            res.send({"error": "Password incorrect!"})
                        }
                    })
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