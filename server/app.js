require('dotenv').config();

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
import apiRouter from './router/api';
import { Excel, SpecifyExcel } from './router/external';

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(logger());
app.use(express.json());
app.use(morgan('dev'));

app.disable('x-powered-by');

app.set('jwt-secret', process.env.secret);

mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to mongodb');
  })
  .catch(e => console.error(e));

app.get('/excel', Excel);
app.post('/specifyexcel', SpecifyExcel);

// SETTING TO API
app.use('/api', apiRouter);

app.listen(port, function() {
  console.log('Node app is running on port', port);
});
