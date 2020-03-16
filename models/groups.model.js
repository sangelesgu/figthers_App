const mongoose = require('mongoose');
const users = require('./users.model');

const types = mongoose.Schema.Types;

const groupSchema = new mongoose.Schema({

    "_id": {
        require: true,
        type: types.ObjectId
    }, 

    "nameGroup": {
        require: true, 
        type: types.String
    }, 

    "members":[{
        require: true,
        type: types.ObjectId,
        ref:  users
    }]


})

module.exports = mongoose.model('Groups', groupSchema)
