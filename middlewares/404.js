
//
const notFound = (req, res, next)=>{
    
   res.status(404).render("404")
}


//Export to server 
module.exports = notFound