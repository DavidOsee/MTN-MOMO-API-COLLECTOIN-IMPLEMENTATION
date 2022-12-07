//
const express = require('express')
require('dotenv').config()
const app = express()
//const connectDB = require('./config/db')

//Parse 
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//Middleware imports 
const errorHandler = require('./middlewares/errorMiddleware')


//Middleware init 
app.use(errorHandler)



//Export to index
module.exports = app; 