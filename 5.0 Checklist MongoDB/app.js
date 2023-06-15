const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

let itens = [];
let itensWork = []

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itensSchema = mongoose.Schema({
    name: String
});

const Item = mongoose.model("item", itensSchema);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))

app.post("/", function(req, res){

    if (req.body.button === "work"){
        console.log(req.body.newItem)
        itensWork.push(req.body.newItem);
        res.redirect("/work");
    }
    else{
    itens.push(req.body.newItem);
    res.redirect("/");
    }

});

app.get("/work/", function(req,res){
    res.render("list", {dayOfWeek: "work", newItems: itensWork})
});


app.get("/", function(req, res){
    let today = new Date();
    const option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("pt-br", option);

    res.render("list", {dayOfWeek: day, newItems: itens});
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});
