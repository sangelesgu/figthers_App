const groups = require('../models/groups.model');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const rutaAbsoluta = path.join(__dirname.replace('controllers', ''), './config/secrets.json')
const secretsContents = fs.readFileSync(rutaAbsoluta);
const secrets = JSON.parse(secretsContents);

mongoose.connect(
    secrets.mongo_login,
    { useUnifiedTopology: true, useNewUrlParser: true }
)


// Create grupup: 
exports.createGroup = (req,res)=>{
    const date = new Date();
    const group = {
        _id: mongoose.Types.ObjectId(),
        nameGroup: req.body.nameGroup,
        members: req.body.members,
        creationDate: date
    }
    const newGroup = new groups(group);
    newGroup.save((error)=>{
        if (error) throw error; 
        res.send({"Message": "Gropu created successfully", "_id":group._id})
    })
};

// Update group:

exports.updateGroup = (req,res)=>{
    const group = {
        _id: req.body._id,
        nameGroup: req.body.nameGroup,
        members: req.body.members
    }
    groups.findByIdAndUpdate(
        req.body._id,
        {$set: group},
        (error, result)=>{
            if (error) throw error; 
            res.send({"Message": "Group update successfully"})
        })
};


// List of all groups:

exports.listOfGroups = (req, res)=>{
    groups.find((error, groups)=>{
        if (error) throw error;
        res.send(groups)
    })
};

// Find one group by id: 
exports.getOneGroup = (req, res)=>{
    const id = req.params.id; 
    groups.findById(id, (error,group)=>{
        if (error) throw error;
        res.send(group)
    })
};

// Delete group
exports.deleteGroup = (req, res)=>{
    const id = req.params.id;
    groups.findByIdAndDelete(id, (error)=>{
        if (error) throw error;
        res.send({"Message": "Group delete successfully"})
    })
};
