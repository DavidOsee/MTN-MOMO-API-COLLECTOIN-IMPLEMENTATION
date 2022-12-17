//
const asyncHandler = require('express-async-handler')
const uuid = require('uuid')
const momo = require("mtn-momo");
const url = require('url')
const Cryptr = require('cryptr');

//Cryptr config
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


//REQUEST TO PAY @ /HOME
//@ Public access 

const home = asyncHandler( async(req, res)=>
{
  //Qwery params

	//
  res.render('home')
  
})


//REQUEST TO PAY @ /pay
//@ Private access 

const pay = asyncHandler( async(req, res)=>
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

    //Redirect with the compulsory url param
    res.redirect(`/success/${encrypted_form_data}`)
  })
  .catch(error => {
    console.log(error);
  });
  
})


//PAYMENT STATUS /momo/success
//@ Private access 

const success = asyncHandler( async(req, res)=>
{
  //Decrypt url param 
  const decrypted_url_data = cryptr.decrypt(req.params.data)
  
  //JSON PARSE DATA
  const transaction_details = JSON.parse(decrypted_url_data)

	//
  res.render('success', {transaction_details})
  
})



//PAYMENT STATUS @ /momo/failure
//@ Private access 

const failure = asyncHandler( async(req, res)=>
{
	//
  
})



//Export to momRoutes 
module.exports = {
	home, pay, success, failure
}