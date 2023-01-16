//
const asyncHandler = require('express-async-handler')
const uuid = require('uuid')
const momo = require("mtn-momo");
const url = require('url')
const Cryptr = require('cryptr');
const jwt = require('jsonwebtoken')

//Cryptr config [For crypting URL's params]
//const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);


//API CONFIG PARAMS
const { Collections } = momo.create({
  callbackHost: process.env.CALLBACK_HOST
})

const collections = Collections({
  userSecret: "445477d7de844d2c816b2ede39da32b7",
  userId: "69eba058-e091-4d86-8f1d-22f97f4050ee",
  primaryKey: process.env.PRIMARY_KEY
})


//REQUEST TO PAY @ /
//@ Public access 

const Home = asyncHandler( async(req, res)=>
{
	//
  res.render('home')
  
})


//REQUEST TO PAY @ /pay
//@ Public access 

const ReqToPay = asyncHandler( async(req, res)=>
{
	//
  res.render('reqToPay')
  
})


//REQUEST TO PAY @ /pay
//@ Private access 

const Pay = asyncHandler( async(req, res)=>
{
  //Request body variables 
  const { fname, lname, email, address, country, city, number, totalAmount} = req.body; 

  //Query data object 
  const requestToPay_form_data = {
    fname,
    lname,
    totalAmount,
    number
  }

  //Pass form_data in JWT as a payload to be accessed in the success controller
  jwt.sign({requestToPay_form_data}, process.env.SECRET_KEY, (e, token)=>{
    res.cookie('token', token)
  }) 
  

	//Request to pay 
  collections
  .requestToPay({
    amount: totalAmount,
    currency: "EUR",
    externalId: "123456", //Random digits 
    payer: {
      partyIdType: "MSISDN", //Mesage type notification/alert 
      partyId: "+2425591261" //Client phone number 
    },
    payerMessage: "Just a testing message",
    payeeNote: "Thanks for using our services"
  })
  .then(transactionId => {
    
    console.log({ transactionId });

    //Redirect to /success
    res.redirect(`/success/${transactionId}`) 
  })
  .catch(error => {
    console.log(error);
  });
  
})



//PAYMENT STATUS @ /process
//@ Private access 

const Process = asyncHandler( async(req, res)=>
{
  res.render('process')
  
	//Redirect to Success/Failure depending on the T. status result 
  //res.redirect(`/sucess/${encrypted_form_data}`)
})







//PAYMENT STATUS /success
//@ Private access 

const Success = asyncHandler( async(req, res)=>
{
 
  //Get token from the request object 
  const token = req.header('auth')
  console.log(token)

  //Get JWT payload object
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
    //Authenticate before rendering the page
   
    //res.render('success')
  })

})



//PAYMENT STATUS @ /failure
//@ Private access 

const Failure = asyncHandler( async(req, res)=>
{
	//
  
})



//Export to momRoutes 
module.exports = {
	Home, ReqToPay, Pay, Process, Success, Failure
}