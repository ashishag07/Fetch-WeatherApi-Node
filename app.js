//jshint esversion:6

const dotenv = require('dotenv');
dotenv.config()

// export express into node.js using require
const express = require("express");
const app = express();

// export HTTPS into Node.js
const https = require("node:https");

// export body-parser to the Node.js
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    console.log(query);
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + process.env.appId + "&units=" + units;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temprature = weatherData.main.temp;
            const weatherIcon = weatherData.weather[0].icon;
            const weatherDescription = weatherData.weather[0].description;
            const imgUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

            res.write("<p>The weather condition in " + query + " is: " + weatherDescription + "</p>");
            res.write("<h1>The temprature in " + query + " is: " + temprature + " degree Celcius.</h1>");
            res.write("<img src= " + imgUrl + ">");
            res.send();                
        });
    });
});

app.listen(3000, function(){
    console.log("Server is started at port 3000.");
});

