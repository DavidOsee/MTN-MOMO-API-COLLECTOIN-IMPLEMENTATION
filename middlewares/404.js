
//
const notFound = (req, res, next)=>{
    
   (res.statusCode > 400 ) && res.render("404")
}


//Export to server 
module.exports = notFound