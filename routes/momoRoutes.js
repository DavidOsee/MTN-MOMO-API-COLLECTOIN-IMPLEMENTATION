//
const express = require('express')
const router = express.Router()
const {home, pay, success, failure} = require('../controllers/momoController')
//
router
.get('/', home)
.post('/pay', pay)
.get('/success/:data', success)
.get('/failure', failure)

//Export to server 
module.exports = router; 