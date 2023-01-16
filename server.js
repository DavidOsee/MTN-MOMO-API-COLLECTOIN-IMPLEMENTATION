//
const express = require('express')
require('dotenv').config()
const app = express()
const cookieParser = require('cookie-parser')

//Parsers 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//Script and Css files for the static view 
app.use(express.static('public'))


//View engine 
const {engine} = require('express-handlebars')
app.engine('.hbs', engine({extname : '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');



//Route IMPORTS 
const momoRoutes = require('./routes/momoRoutes')



//Route inits
app.use('/', momoRoutes)


//Middleware imports 
const errorHandler = require('./middlewares/errorMiddleware')
const notFound = require('./middlewares/404')


//Middleware init 
app.use(notFound) //# 404 redirect
app.use(errorHandler)



//Export to index
module.exports = app; 