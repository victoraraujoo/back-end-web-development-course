const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const key_api = "0bf4604fe045a4a80c1df0a160f1f6ce"
    const city = req.body.NameCity;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=metric&appid=" + key_api + "&lang=pt_br";
    https.get(url, function(response){
        console.log(response.headers);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const tempo = weatherData.main.temp;
            const situacaoClima = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const url_icon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.write("<p>O tempo em florianopolis é " + situacaoClima + " </p>", "utf-8");
            res.write("<br><img src='" + url_icon + "' alt='Imagem do clima na regiao'>", "utf-8");
            res.write("<h1>O tempo em " + city + " é " +  tempo + " °C</h1>", "utf-8");
            res.send();
        });
    });
});


app.listen(3000, function(){
    console.log("My app is running on port 3000");
});