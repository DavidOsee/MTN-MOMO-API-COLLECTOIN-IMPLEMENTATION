//
const asyncHandler = require('express-async-handler')
const uuid = require('uuid')
const momo = require("mtn-momo");
const url = require('url')
const Cryptr = require('cryptr');

//Cryptr config [For crypting URL's params]
const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);


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

    //redirect to success page

    //Query data object 
    const requestToPay_form_data = JSON.stringify({
      fname,
      lname,
      totalAmount,
      transactionId,
      number
    })
    //Encrypt OBJ
    encrypted_form_data = cryptr.encrypt(requestToPay_form_data)

    //Redirect to process first with the mandatory url param
    //res.redirect(`/process/${encrypted_form_data}`)

    res.redirect(`/success/${encrypted_form_data}`)
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

//PAYMENT STATUS /success/:data
//@ Private access 

const Success = asyncHandler( async(req, res)=>
{
 
  //Decrypt url param 
  const decrypted_url_data = cryptr.decrypt(req.params.data)
  
  //JSON PARSE DATA
  const transaction_details = JSON.parse(decrypted_url_data)

	//Authenticate before rendering the page
  res.render('success', {transaction_details})
  
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