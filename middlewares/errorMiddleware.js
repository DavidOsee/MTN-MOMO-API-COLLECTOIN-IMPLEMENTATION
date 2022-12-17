//
const errorHandler = (err, req, res, next)=>{
	//
	const statusCode = (res.statusCode)? res.statusCode : 500;

	//Set status code in res
	res.status(statusCode)

	//Return err json 
	res.json({
		message : err.message,
		stack : (process.env.NODE_ENV === 'development')? err.stack : null
	})
}


//Export to server 
module.exports = errorHandler