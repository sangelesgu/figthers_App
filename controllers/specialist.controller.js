const mongoose = require ('mongoose');
const specialists = require('../models/specialist.model');
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


// Create specialist with hash password: 
exports.createSpecialist = (req, res)=>{
    const date = new Date();
    bcrypt.hash(
        req.body.password,
        14,
        (error, hash)=>{
            if(error) throw error;

            const specialist = {
                _id: req.body._id,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                name: req.body.name,
                registrationDate: date,
                hospital: req.body.hospital,
                gender: req.body.gender,
                speciality: req.body.speciality,
                numCollegiate: req.body.numCollegiate,
                languages: req.body.languages
            }

            const newSpecialist = new specialists(specialist);
            newSpecialist.save((error)=>{
                if (error) throw error;
                res.send({"message": "Specialist created", "_id":specialist._id})
            })
        })
};

exports.listOfSpecialists = (req, res)=>{

    specialists.find( (error, specialists)=>{
        if(error) throw error; 
        res.send(specialists)
    })
};

exports.getOneSpecialist = (req, res)=>{
    auth.checkToken(
        req ,res,
        (req,res)=>{
            const id = req.params.id; 
            specialists.findById(id, (error, specialist)=>{
                if(error) throw error; 
                res.send(specialist)
            })
        })
};


exports.editSpecialist = (req, res)=>{
    auth.checkToken(
        req,res,
        (req,res)=>{
            const specialist = {
                _id: req.body._id,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                name: req.body.name,
                speciality: req.body.speciality,
                numCollegiate: req.body.numCollegiate
            }
            specialists.findByIdAndUpdate(
                req.body._id,
                {$set:specialist},
                (error,result)=>{
                    if(error) 
                    throw error; 
                        res.send({"Message": "Specialist update successfully"})    
                })
        })
};

exports.deleteSpecialist = (req, res)=>{

    auth.checkToken(
        req, res,
        (req,res)=>{
            const id = req.params.id;
            specialists.findByIdAndDelete(id, (error)=>{
                if (error) throw error; 
                res.send({"Message": "Specialist delete successfulluy"})
            })
        })
};