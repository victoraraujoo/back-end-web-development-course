const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose =  require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB")

const articleSchema = mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model("article", articleSchema);

app.route("/articles")
.get(function(req, res){
    Article.find()
    .then(function(articles){
        res.send(articles)
    }).catch(function(error){
        res.send(error)
    });
})
.post(function(req,res){
    const newArticle = Article({
        title : req.body.title,
        content: req.body.content
    })
    newArticle.save()
    .then(function(){
        res.send("Successfuly add a new article")
    })
    .catch(function(error){
        res.send(error)
    });
})
.delete(function(req,res){
    Article.deleteMany()
    .then(function(){
        res.send("Successfuly deleted all articles")
    }).catch(function(error){
        res.send(error)
    });
});


app.route("/articles/:articleTitle")
.get(function(req, res){
    Article.findOne({title: req.params.articleTitle})
    .then(function(article){
        res.send(article)
    })
    .catch(function(error){
        res.send(error)
    });
})
.put(function(req, res){
    Article.update({title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true})
    .then(function(){
        res.send("Successfuly updated the article")
    })
    .catch(function(error){
        res.send(error)
    });
})
.patch(function(req, res){
    Article.update({title: req.params.articleTitle},
        {$set: req.body})
    .then(function(){
         res.send("Successfuly updated the article")
    })
    .catch(function(error){
        res.send(error)
    })
})
.delete(function(req, res){
    Article.deleteOne(
        {title: req.params.articleTitle}
    ).then(function(){
        res.send("Sucessfully deleted the article")
    }).catch(function(error){
        res.send(error)
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000")
})