
const jwt = require('jsonwebtoken')

//
const verifyToken  = (req, res, next)=>
{
    //Get auth header value 
    const token = req.header('auth')

    console.log(token)
  
    //Check if bearer is undefinded 
    if(!token){
        //Redirect to the 404 page
        res.sendStatus(403) //Forbidden 
    }
    
    //Validate token
    try{
        //Get payload data from token
        const token_payload = jwt.verify(token, process.env.SECRET_KEY)

        //Set Payload data in req object
        req.form_data = token_payload

    }catch(e){
        //Unauthorized
        res.sendStatus(401) 
    }
    //Next 
    next()
}



//Export to momoRoutes  
module.exports = verifyToken