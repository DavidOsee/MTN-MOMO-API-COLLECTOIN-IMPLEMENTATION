//
const asyncHandler = require('express-async-handler')


//GET @ /momo
//@ Private access 
const getMomo = asyncHandler( async(req, res)=>{
	//
	res.json({msg : "Get"})
})

//POST @ /momo
//@ Private access 
const postMomo = asyncHandler( async(req, res)=>{
	//
	res.json(req.body)
})

//PUT @ /momo
//@ Private access 
const putMomo = asyncHandler( async(req, res)=>{
	//
	res.json({msg: 'Put'})
})

//DELETE @ /momo
//@ Private access 
const DeleteMomo = asyncHandler( async(req, res)=>{
	//
	res.json({msg: 'Delete'})
})


//Export to momRoutes 
module.exports = {
	getMomo, postMomo, putMomo, DeleteMomo
}