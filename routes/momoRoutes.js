//
const express = require('express')
const router = express.Router()
const {Home, ReqToPay, Pay, Process, Success, Failure} = require('../controllers/momoController')
const protect = require('../middlewares/protect')
//
router
.get('/', Home)
.get('/pay', ReqToPay)
.get('/success/:data', protect, Success)
.get('/process/:data', protect, Process)
.get('/failure', Failure)


//Post routes
router
.post('/pay', Pay)


//Export to server 
module.exports = router; 