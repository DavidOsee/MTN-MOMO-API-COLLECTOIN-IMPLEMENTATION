
//404
const notFound = (req, res, next) =>{
    //Redirect to Home if route not found 
    if(res.statusCode === 404)
        console.log(res.statusCode)
}

//Export to server
module.exports = notFound