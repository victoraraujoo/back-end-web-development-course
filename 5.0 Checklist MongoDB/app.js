const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash")

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itemSchema = mongoose.Schema({
    name: String
});

const listSchema = mongoose.Schema({
    listName: String,
    listItens: [itemSchema]
})

const List = mongoose.model("list", listSchema);

const Item = mongoose.model("item", itemSchema);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))

app.post("/", function(req, res){

    const newItem = new Item({
        name: req.body.newItem
    });

    const title = req.body.button

    if (title === 'day'){ 
        newItem.save();
        res.redirect("/");
    }else{
        List.findOne({listName: title})
        .then(function(itens){
            itens.listItens.push(newItem);
            itens.save();
            res.redirect("/" + title);
        })
    }
});

app.post("/delete", function(req, res){
    const checkedId = req.body.checkbox
    const listName1 = req.body.listName

    if (listName1 === "day"){
        Item.findByIdAndDelete(checkedId)
        .catch(function(error){
            console.log(error)
        })
        res.redirect("/");
    }else{
        List.findOneAndUpdate({listName: listName1}, {$pull: {listItens: {_id : checkedId}}})
        .then(function(){
            res.redirect("/" + listName1);
        })
        .catch(function(error){-
            console.log(error)
        })
    }
})

app.get("/:customListName", function(req,res){
    const listName = _.capitalize(req.params.customListName);

    List.find();

    List.findOne({
        listName: listName
    })
    .then(function(checkedList){                        
        if (!checkedList){
            const list = new List({
                listName: listName,
                listItens: []
            })
             list.save()
             res.redirect("/" + listName)
        }else{
            res.render("list", {listTitle: listName, newItems: checkedList.listItens});
        }
    }).catch(function(error){
        console.log(error)
    })
});

app.get("/", function(req, res){
    Item.find()
    .then(function(itens){
        res.render("list", {listTitle: "day", newItems: itens});
    }).catch(function(error){
        console.log(error)
    });
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});
