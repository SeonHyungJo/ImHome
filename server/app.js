require('dotenv').config()

import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import session from 'express-session'
import logger from 'morgan'
import cors from 'cors'

// api uri
import routers from './router/api/router'
// auth 설정
const auth = require('./router/auth')

// 서버 기동
const app = express()
const port = process.env.PORT || 3000

// 보안을 위한 helmet 라이브러리 사용
app.use(helmet())
app.use(cors())
app.use(logger())
// X-Powered-By 헤더는 사용하지 않도록 설정
app.disable('x-powered-by')

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
app.set('jwt-secret', process.env.secret)

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// print the request log on console
app.use(morgan('dev'))

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise

// CONNECT TO MONGODB SERVER
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
)
  .then(() => {
    console.log('Successfully connected to mongodb')
  })
  .catch(e => console.error(e))

// SETTING TO AUTH
app.use('/api', auth)

app.get('/excel', function (req, res) {
  // Require library
  var xl = require('excel4node')

  // Create a new instance of a Workbook class
  var wb = new xl.Workbook()

  // Add Worksheets to the workbook
  var ws = wb.addWorksheet('Sheet 1')
  var ws2 = wb.addWorksheet('Sheet 2')

  // Create a reusable style
  var style = wb.createStyle({
    font: {
      color: '#FF0800',
      size: 12
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -'
  })

  // Set value of cell A1 to 100 as a number type styled with paramaters of style
  ws.cell(1, 1)
    .number(100)
    .style(style)

  // Set value of cell B1 to 200 as a number type styled with paramaters of style
  ws.cell(1, 2)
    .number(200)
    .style(style)

  // Set value of cell C1 to a formula styled with paramaters of style
  ws.cell(1, 3)
    .formula('A1 + B1')
    .style(style)

  // Set value of cell A2 to 'string' styled with paramaters of style
  ws.cell(2, 1)
    .string('string')
    .style(style)

  // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
  ws.cell(3, 1)
    .bool(true)
    .style(style)
    .style({font: {size: 14}})

  wb.write('ExcelFile.xlsx', res)
})

// SETTING TO ROUTER
routers.map(router => app.use('/api', router))

app.listen(port, function () {
  console.log('Node app is running on port', port)
})
