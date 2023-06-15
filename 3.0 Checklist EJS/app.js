const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let itens = [];
let itensWork = []

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))

app.post("/", function(req, res){

    if (req.body.button === "work"){
        itensWork.push(req.body.newItem);
        res.redirect("/work");
    }
    else{
    itens.push(req.body.newItem);
    res.redirect("/");
    }

});

app.post("/changePage", function(req, res){
    if (req.body.button2 === "work"){
        res.redirect("/");
    }
    else{
        console.log(req.body.button2)
        res.redirect("/work");
    }
});

app.get("/work", function(req,res){
    res.render("list", {dayOfWeek: "work", newItems: itensWork, page: "work"})
});


app.get("/", function(req, res){
    let today = new Date();
    const option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("pt-br", option);

    res.render("list", {dayOfWeek: day, newItems: itens, page: "days"});
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});
