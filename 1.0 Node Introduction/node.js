
const express = require("express");

const app = express();

app.get("/", function(request, response){
    response.send("<h1>Hello</h1>");
});

app.get("/about", function(req, res){
    res.send("<h1>I'm Victor and i'm graduating in System Information</h1>");
});


app.get("/hobbies", function(request, response){
    response.send("<h1>I like to play soccer</h1>");
});

app.listen(3000, function(){
    console.log("Server is on port 3000")
});
