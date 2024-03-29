//
const express = require('express')
const router = express.Router()
const {Home, ReqToPay, Pay, Process, Success, Failure} = require('../controllers/momoController')
const sendEmail = require('../controllers/emailController')
const protected = require('../middlewares/protect')
//
router
.get('/', Home)
.get('/pay', Pay)
.get('/success/:data', protected, Success)
.get('/process/:data', protected, Process)
.get('/failure/:status/:id', protected, Failure)


//Post routes
router
.post('/reqToPay', ReqToPay)
.post('/sendEmail', sendEmail)


//Export to server 
module.exports = router; 