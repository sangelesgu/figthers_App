const mongoose = require('mongoose');
const articles = require('./article.model');

const types = mongoose.Schema.Types;

const specialistSchema = new mongoose.Schema({

    "_id": {
        require : true,
        type : types.ObjectId
    },
    "avatar":{
        require: false,
        type: types.String
    },

    "username": {
        require: true, 
        type: types.String,
        min: 3,
        max: 30
    },

    "password":{
        require : true,
        type: types.String,
        min: 5,
        max: 250
    },

    "email": {
        require: true,
        type: types.String,
        min: 3,
        max: 250
    }, 

    "name": {
        require: true,
        type: types.String,
    }, 

    "lastName":{
        require: true,
        type: types.String
    },


    "registrationDate":{
        require: true,
        type: types.Date
    },

    "hospital":{
        require: true,
        type: types.String
    },

    "gender":{
        require: false,
        type: types.String
    },

    "speciality": {
        require: true,
        type: types.String,
    }, 

    "numCollegiate":{
        require: true,
        type: types.Number, 
    },

    "articles":[{
        require: false,
        type: types.ObjectId,
        ref: articles
    }],

    "languages":{
        require: false,
        type: types.String
    },
    
    "location":{
        require: true,
        type: types.String
    }


});

module.exports = mongoose.model ('Specialist', specialistSchema);