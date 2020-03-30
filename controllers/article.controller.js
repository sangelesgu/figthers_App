const articles = require('../models/article.model');
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


exports.creteArticle = (req, res)=>{
    const date = new Date();
    const article = {

        _id: mongoose.Types.ObjectId,
        title: req.body.title,
        description: req.body.description,
        url_image: req.body.url_image,
        article: req.body.article,
        date   
    }

    const newArticle = articles(article);
    article.save( (error)=>{
        if (error) throw error;
        res.send({"Message":"Article created successfully", "_id":article._id})
    })
};


exports.getArticles = (req, res)=>{
    articles.find( (error, articles)=>{
        if (error) throw error; 
        res.send(articles)
    })
};