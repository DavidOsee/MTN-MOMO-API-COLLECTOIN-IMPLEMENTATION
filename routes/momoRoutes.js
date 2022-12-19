//
const express = require('express')
const router = express.Router()
const {Home, ReqToPay, Pay, Process, Success, Failure} = require('../controllers/momoController')
//
router
.get('/', Home)
.get('/success/:data', Success)
.get('/failure', Failure)
.get('/processing', Process)


//Pay routes
router
.get('/pay', ReqToPay)
.post('/pay', Pay)


//Export to server 
module.exports = router; 