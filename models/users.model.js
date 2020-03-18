
const mongoose = require('mongoose');

const types = mongoose.Schema.Types;

// New user schema: 
const usersSchema = new mongoose.Schema({

    "_id": {
        require: true,
        type: types.ObjectId
    }, 

    "username":{
        require: true, 
        type: types.String,
        min : 3,
        max : 50
    },

    "email": {
        require: true,
        type: types.String,
        min : 5,
        max : 250
    },
    
    "password": {
        require: true,
        type: types.String,
        
    },

    "registrationDate":{
        require: true, 
        type: types.Date
    },

    "name":{
        require: false,
        type: types.String
    },

    "age": {
        require: false,
        type: types.Number
    },

    "gender": {
        require: true,
        type: types.String
    },

    "cancer": {
        require: true,
        type: Boolean,
        default: false
    },  

    "cancerTypus": {
        type: types.String,
        require: ()=>{
            if (this.cancer){
                return false
            } else {
                return true
            }
        }
    },
    "isDocuments": {
        require: false, 
        type: types.String
    }, 

    "documents": {
        type: types.String,
        require: ()=>{
            if (this.isDocuments){
                return false
            } else {
                return true
           }
        }
    }
});

module.exports = mongoose.model('Users', usersSchema);
