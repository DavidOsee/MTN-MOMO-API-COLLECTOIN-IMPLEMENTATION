//
const express = require('express')
require('dotenv').config()
const app = express()
//const connectDB = require('./config/db')

//Parse 
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//View engine 
const {engine} = require('express-handlebars')
app.engine('.hbs', engine({extname : '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('home');
});


//Route IMPORTS 
const momoRoutes = require('./routes/momoRoutes')


//Route inits
app.use('/momo', momoRoutes)


//Middleware imports 
const errorHandler = require('./middlewares/errorMiddleware')


//Middleware init 
app.use(errorHandler)



//Export to index
module.exports = app; 