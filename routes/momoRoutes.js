//
const express = require('express')
const router = express.Router()
const {Home, ReqToPay, Pay, Process, Success, Failure} = require('../controllers/momoController')
const protect = require('../middlewares/protect')
//
router
.get('/', Home)
.get('/pay', ReqToPay)
.get('/success/:id', protect, Success)
.get('/failure', Failure)
.get('/processing', Process)


//Post routes
router
.post('/pay', Pay)


//Export to server 
module.exports = router; 