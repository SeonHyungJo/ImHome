var express = require('express');
var app = express();

app.get("/hello", function(req,res){
  res.render("hello", {name:req.query.nameQuery});
});

var port = process.env.PORT || 3000; //*
app.listen(port, function(){
  console.log('Server On!');
});