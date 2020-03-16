const mongoose = require('mongoose');

const types = mongoose.Schema.Types;

const specialistSchema = new mongoose.Schema({

    "_id": {
        require : true,
        type : types.ObjectId
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

    "speciality": {
        require: true,
        type: types.String,
    }, 

    "numCollegiate":{
        require: true,
        type: types.Number, 
        min: 1,
        max: 9
    }
});

module.exports = mongoose.model ('Specialist', specialistSchema);