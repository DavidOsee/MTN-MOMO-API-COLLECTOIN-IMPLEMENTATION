//
const asyncHandler = require('express-async-handler')
const uuid = require('uuid')
const momo = require("mtn-momo")
const url = require('url')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET_KEY)

//Localstorage
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');




//API CONFIG PARAMS
const { Collections } = momo.create({
  callbackHost: process.env.CALLBACK_HOST
})

const collections = Collections({
  userSecret: "445477d7de844d2c816b2ede39da32b7",
  userId: "69eba058-e091-4d86-8f1d-22f97f4050ee",
  primaryKey: process.env.PRIMARY_KEY
})


//HOME  @ / [GET]
//@ Public access 

const Home = asyncHandler( async(req, res)=>
{
	//
  res.render('home')
  
  //Delete the alert 
})


//REQUEST TO PAY @ /pay [GET]
//@ Public access 

const Pay = asyncHandler( async(req, res)=>
{
	//JUST RENDER
  res.render('checkout')
  
})


//REQUEST TO PAY @ /pay [POST]
//@ Private access 

const ReqToPay = asyncHandler( async(req, res)=>
{
  //Request body variables 
  const { fname, lname, number, totalAmount} = req.body; 

	//Request to pay 
  collections
  .requestToPay({
    amount: totalAmount,
    currency: "EUR",
    externalId: "066606060", //Self Momo number 
    payer: {
      partyIdType: "MSISDN", //Mesage type notification/alert 
      partyId: number //Client phone number 
    },
    payerMessage: "Just a testing message",
    payeeNote: "Thanks for using our services"
  })
  .then(transactionId => {

    
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
    //res.cookie('transaction_data', encrypted_form_data, {expire : new Date() + 7200}) 

    //Set data in localstorage variable 
    localStorage.setItem('User_data', encrypted_form_data)
    console.log('Process')
    //Redirect to /process
    res.redirect(`/process/${encrypted_form_data}`)

    //Send User_data to the view
    //res.send(encrypted_form_data) 
  })
  .catch(error => {
    console.log(error);
  });
  
})



//PAYMENT PROCESS /process [GET]
//@ Private access 

const Process = asyncHandler( async(req, res)=>
{
  //Redirect to 404 if url params is != encrypted_form_data
  if(req.params.data != localStorage.getItem('User_data'))
      res.status(404).redirect('/404') //User trynna force access to this route

  console.log('Process')
  //Get transaction_data obj from req
  const transaction_details = req.transaction_data
  const transactionID = transaction_details.transactionId

  //Get user phone number 
  const user_number = transaction_details.number
  console.log(user_number)

  //Get transaction status and account balance 
  collections.getTransaction(transactionID)
  .then(transaction =>{
   
    //Get transaction status
    const transaction_status = transaction.status

    //Render to the template with the needed obj
    res.render('process', {transactionID, transaction_status, user_number})
  })
  .catch(e =>{
    console.log(e.message);
  })

})






//PAYMENT STATUS /success [GET]
//@ Private access 

const Success = asyncHandler( async(req, res)=>
{
  //Get transaction details
  const transaction_details = req.transaction_data
  const transactionID = transaction_details.transactionId

  //Initiate balance 
  let balance

  //Get User balance 
  collections.getTransaction(transactionID)
  .then(transaction => {

    //Get financialTransactionId
    //const financialTransactionId = transaction.financialTransactionId
    
    // Get account balance
    return collections.getBalance(transactionID);
  })
  .then(accountBalance => {
    
    //Show balance only when the result is different from error like "Access to target environment is forbidden."
    //if(!accountBalance) //If balance is not a number 
     // console.log("Error " + balance) //Set balance to 0

    //Get accout balance 
    balance = accountBalance.availableBalance

    console.log(balance)

    //Render to the template with the needed obj
    res.render('success', {transaction_details, balance})
  })
  .catch(e =>{
    //Set balance to 0 if internal errors happen  
    balance = 0 

    //Still render the view with balance 0
    res.render('success', {transaction_details, balance})

    console.log("error : " + e.message);
  })
})



//PAYMENT STATUS @ /failure [GET]
//@ Private access 

const Failure = asyncHandler( async(req, res)=>
{
  //Get transaction details
  const transactionID = req.transaction_data.transactionId

  //Array of possible transsaction statuses 
  const statuses = ["transaction-failed", "transaction-rejected", "transaction-timed out"]

  //Redirect to 404 if url params is != encrypted_form_data
  if(!req.params.status || !req.params.id || statuses.includes(req.params.status)=== false) //User trynna force access to this route
  {
    res.status(404).redirect('/404') //User trynna force access to this route
  }
  
  //Get transaction params
  const status = req.params.status.split('-')[1]

	//Render the view
  res.render('failure', {transactionID, status})

  // failure/transaction-rejected/18590136-60a2-4958-bf13-a6b0ffc08b5d
  
})



//Export to momRoutes 
module.exports = {
	Home, ReqToPay, Pay, Process, Success, Failure
}