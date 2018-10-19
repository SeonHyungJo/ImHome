var cool = require('cool-ascii-faces');
var express = require('express');
var mongoose = require('mongoose');
require('dotenv').config();

var app = express();

var port = process.env.PORT || 3000;

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// DEFINE MODEL
var Books = require('./models/books');

app.get("/", (req, res) => {
    res.send({ hello: "world" });
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

// GET ALL BOOKS
app.get('/books', function(req,res){
  Books.find(function(err, books){
    if(err){
      return res.status(500).send({error: 'database failure'});
    } 

    res.json(books);
  });
});

app.listen(port, function(){
  console.log('Node app is running on port', port);
});