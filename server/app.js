require('dotenv').config();

//test22
const express = require('express');
const mongoose = require('mongoose');
const user = require('./router/api/user');
const product = require('./router/api/product');
const order = require('./router/api/order');
const auth = require('./router/auth');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const session = require('express-session');


const app = express();
const port = process.env.PORT || 3000;

// 보안을 위한 helmet 라이브러리 사용
app.use(helmet());
// X-Powered-By 헤더는 사용하지 않도록 설정
app.disable('x-powered-by');

//기본 세션 쿠키 이름을 사용하지 않음
// var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
// app.use(session({
//   name: 'session',
//   keys: ['key1', 'key2'],
//   cookie: { secure: true,
//             httpOnly: true,
//             domain: 'example.com',
//             path: 'foo/bar',
//             expires: expiryDate
//           }
//   })
// );

// set the secret key variable for jwt
app.set('jwt-secret', process.env.secret)

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// print the request log on console
app.use(morgan('dev'))

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
app.use("/api", order);

app.listen(port, function () {
  console.log('Node app is running on port', port);
});