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

exports.createSpecialist = (req, res)=>{

    bcrypt.hash(
        req.body.password,
        14,
        (error, hash)=>{
            if(error) throw error;

            const specialist = {
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash,
                email: req.body.email,
                name: req.body.name,
                speciality: req.body.speciality
            }

            const newSpecialist = new specialists(specialist);
            newSpecialist.save((error)=>{
                if (error) throw error;
                res.send({"message": "Specialist created", "_id":specialist._id})
            })
        })
};

