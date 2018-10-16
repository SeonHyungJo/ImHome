var express = require('express');
var app = express();

app.get("/", (req, res) => {
    res.send({ hello: "world" });
});

var port = process.env.PORT || 3000; //*
app.listen(port, function(){
  console.log('Server On!');
});