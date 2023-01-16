//
const asyncHandler = require('express-async-handler')
const uuid = require('uuid')
const momo = require("mtn-momo")
const url = require('url')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET_KEY);


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
      partyId: number //Client phone number 
    },
    payerMessage: "Just a testing message",
    payeeNote: "Thanks for using our services"
  })
  .then(transactionId => {
    
    console.log({ transactionId });

    //Query data object 
    const requestToPay_form_data = {
      fname,
      lname,
      totalAmount,
      number,
      transactionId
    }
    const form_data_stringified = JSON.stringify(requestToPay_form_data)

    //Encrypt transaction data 
    const encrypted_form_data = cryptr.encrypt(form_data_stringified)

    //Store encrypted transactioId in the localStorage
    res.cookie('transaction_data', encrypted_form_data, {expire : new Date() + 7200}) 

    //Redirect to /success
    res.redirect(`/process/${encrypted_form_data}`) 
  })
  .catch(error => {
    console.log(error);
  });
  
})



//PAYMENT STATUS /success
//@ Private access 

const Process = asyncHandler( async(req, res)=>
{
  //Get transaction_data obj from req
  const transaction_details = req.transaction_data
  const transactionID = transaction_details.transactionId

  //Get transaction status and account balance 
  collections.getTransaction(transactionID)
  .then(accountBalance =>{
    //Get account balance 
    console.log({ accountBalance })

    //Get transaction status
    const transaction_status = accountBalance.status;

     //Render to the template with the needed obj
    res.render('process', {transactionID, transaction_status})
  })
  .catch(e =>{
    console.log(e.message);
  })

})






//PAYMENT STATUS /success
//@ Private access 

const Success = asyncHandler( async(req, res)=>
{
  //Get transaction_data obj from req
  const transaction_details = req.transaction_data

  //Render to the template with the needed obj
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