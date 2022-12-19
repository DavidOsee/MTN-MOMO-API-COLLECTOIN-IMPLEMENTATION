//
const express = require('express')
require('dotenv').config()
const app = express()
//const connectDB = require('./config/db')

//Parse 
app.use(express.json())
app.use(express.urlencoded({extended:false}))

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


//Middleware init 
app.use(errorHandler)



//Export to index
module.exports = app; 