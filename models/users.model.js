
const mongoose = require('mongoose');
const articles = require('./article.model');
const groups = require('./groups.model');
const types = mongoose.Schema.Types;

// New user schema: 
const usersSchema = new mongoose.Schema({

    "_id": {
        require: true,
        type: types.ObjectId
    }, 

    "avatar":{
        require: false,
        type:types.String
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

    "lastName":{
        require: true, 
        type: types.String
    },

    "age": {
        require: false,
        type: types.Number
    },

    "gender": {
        require: false,
        type: types.String,
        enum: ['Man', 'Woman', 'Others']
    },

    "cancer": {
        require: true,
        type: types.Boolean,
        default: false
    },  


    "location":{
        require: false,
        type: types.String
    },

    "cancerType": [{
        type: types.String,
        require: ()=>{
            if (this.cancer){
                return false
            } else {
                return true
            }
        },
        ref: articles
    }],
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
    }, 
    "groups":[{
        require: false,
        type: types.ObjectId,
        ref: groups
    }] 
});

module.exports = mongoose.model('Users', usersSchema);
