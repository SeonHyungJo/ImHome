require('dotenv').config();

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import logger from 'morgan';
import cors from 'cors';

// api uri
import routers from './router/api/router';
// auth 설정
const auth = require('./router/auth');

// 서버 기동
const app = express();
const port = process.env.PORT || 3000;

// ----------------------------------------------
import graphqlHTTP from 'express-graphql';
import Graphql from 'graphql';
const geoType = new Graphql.GraphQLObjectType({
    // Object 타입을 정의합니다.
    name: 'geo',
    fields: {
        lat: { type: Graphql.GraphQLFloat },
        lng: { type: Graphql.GraphQLFloat }
    }
});
const companyType = new Graphql.GraphQLObjectType({
    name: 'company',
    fields: {
        name: { type: Graphql.GraphQLString },
        catchPhrase: { type: Graphql.GraphQLString },
        bs: { type: Graphql.GraphQLString }
    }
});
const addressType = new Graphql.GraphQLObjectType({
    name: 'address',
    fields: {
        street: { type: Graphql.GraphQLString },
        suite: { type: Graphql.GraphQLString },
        city: { type: Graphql.GraphQLString },
        zipcode: { type: Graphql.GraphQLString },
        geo: { type: geoType } // Object 형태일 경우 새로 GrapgQLObject를 만들어서 지정해 줍니다.
    }
});
const userType = new Graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: Graphql.GraphQLInt },
        name: { type: Graphql.GraphQLString },
        username: { type: Graphql.GraphQLString },
        email: { type: Graphql.GraphQLString },
        address: { type: addressType }, // Object 형태일 경우 새로 GrapgQLObject를 만들어서 지정해 줍니다.
        phone: { type: Graphql.GraphQLString },
        website: { type: Graphql.GraphQLString },
        company: { type: companyType } // Object 형태일 경우 새로 GrapgQLObject를 만들어서 지정해 줍니다.
    }
});

var queryType = new Graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                // 쿼리문 중 인자를 정의하는 곳
                id: { type: Graphql.GraphQLInt }
            },
            resolve: function(_, { id }, _, _) {
                // 실제로 쿼리 될때 호출되는 메소드
                const data = Object.keys(fakeDatabase).filter(element => {
                    if (fakeDatabase[element].id == id) {
                        return element;
                    }
                });
                return fakeDatabase[data];
            }
        },
        allUser: {
            type: new Graphql.GraphQLList(userType),
            resolve: function(_, _, _, _) {
                return fakeDatabase;
            }
        }
    }
});

var schema = new Graphql.GraphQLSchema({ query: queryType });

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
);

// ----------------------------------------------

// 보안을 위한 helmet 라이브러리 사용
app.use(helmet());
app.use(cors());
app.use(logger());
// X-Powered-By 헤더는 사용하지 않도록 설정
app.disable('x-powered-by');

// 기본 세션 쿠키 이름을 사용하지 않음
// var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ) // 1 hour
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
// )

// set the secret key variable for jwt
app.set('jwt-secret', process.env.secret);

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// print the request log on console
app.use(morgan('dev'));

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose
    .connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log('Successfully connected to mongodb');
    })
    .catch(e => console.error(e));

// SETTING TO AUTH
app.use('/api', auth);

// SETTING TO ROUTER
routers.map(router => app.use('/api', router));

app.listen(port, function() {
    console.log('Node app is running on port', port);
});
