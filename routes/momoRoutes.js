//
const express = require('express')
const router = express.Router()
const {getMomo, postMomo, putMomo, DeleteMomo} = require('../controllers/momoController')
//
router.
get('/', getMomo)
.post('/', postMomo)
.put('/', putMomo)
.delete('/', DeleteMomo)

//Export to server 
module.exports = router; 