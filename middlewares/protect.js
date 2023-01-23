
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET_KEY);
//Localstorage
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


//
const protect = (req, res, next)=>
{
    console.log('Protected');
    //Check for the existance of User_data localstorage variable
    if(!localStorage.getItem('User_data')){

         //Redirect to 404 page
         res.status(404)
         res.redirect('/404') //Unknown route 
    }

    //Decrypt transaction_data stored in a cookie
    const decrypted_transaction_data = cryptr.decrypt(localStorage.getItem('User_data'))

    //JSON parse transaction_data object and pass it into the req obj
    if(!req.transaction_data)
        req.transaction_data= JSON.parse(decrypted_transaction_data)
    
    //Next middleware
    next()
}



//Export to momoRoutes  
module.exports = protect