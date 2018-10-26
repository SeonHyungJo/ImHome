require('dotenv').config();

//test22
const express = require('express');
const mongoose = require('mongoose');
const user = require('./router/api/user');
const product = require('./router/api/product');
const auth = require('./router/auth');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// print the request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', process.env.secret)

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to mongodb')
  })
  .catch(e => console.error(e));

// SETTING TO AUTH
app.use('/api', auth);

// SETTING TO ROUTER
app.use("/api", user);
app.use("/api", product);
//app.use("/api/auth", auth);

app.listen(port, function () {
  console.log('Node app is running on port', port);
});