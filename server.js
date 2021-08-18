var express = require("express"),
  config = require("./app"),
  path = require("path"),
  dotenv = require('dotenv').config(),
  mongoose = require("mongoose"),
  { MongoClient } = require('mongodb');


var app = express();
app = config(app);
app.set("port", process.env.PORT || 4000);



mongoose.connect(process.env.DATABASE_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("open", function () {
  console.log("Mongoose Connected Successfully!");
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err.message.red);
  });


var server = app.listen(app.get("port"), function () {
  console.log("Server up: http://localhost:" + app.get("port"));
});