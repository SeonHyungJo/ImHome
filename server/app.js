require('dotenv').config();

import express from 'express';
// import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
// import session from 'express-session';
import logger from 'morgan';
import cors from 'cors';

// api uri
import apiRouter from './router/api';
import { Excel, SpecifyExcel } from './router/external';

// 서버 기동
const app = express();
const port = process.env.PORT || 3000;

// 보안을 위한 helmet 라이브러리 사용
app.use(helmet());
app.use(cors());
app.use(logger());
// X-Powered-By 헤더는 사용하지 않도록 설정
app.disable('x-powered-by');

// set the secret key variable for jwt
app.set('jwt-secret', process.env.secret);

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Print log on console
app.use(morgan('dev'));

// Node.js의 native Promise 사용할 수 있도록 override
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to mongodb');
  })
  .catch(e => console.error(e));

app.get('/excel', Excel);
app.get('/specifyexcel', SpecifyExcel);

// SETTING TO API
app.use('/api', apiRouter);

app.listen(port, function() {
  console.log('Node app is running on port', port);
});
