const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/fruitsDB";

mongoose.connect(url);

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);


const apple = new Fruit({
  name: "Orange",
  rating: 7,
  review: "Best juice, but hard to peel!"
});

//apple.save();

Fruit.find()
    .then(function (fruits) {
        fruits.forEach(function (fruit) {
            console.log(fruit.name);
        });
        mongoose.connection.close();
    })
    .catch(function (err) {
        console.log(err);
});
