const mongoose = require('mongoose');


const types = mongoose.Schema.Types;

const dataBaseSchema = new mongoose.Schema({
    "_id": {
        require:true,
        type: types.ObjectId
    }, 

    "title": {
        require: true,
        type: types.String
    },

    "description": {
        require: true,
        type: types.String
    },

    "url_image": {
        require: true,
        type: types.String
    },

    "article": {
        require: true,
        type: types.String
    },

    "date": {
        require: true,
        type: types.Date
    }
});

module.exports = mongoose.model('articles', dataBaseSchema);