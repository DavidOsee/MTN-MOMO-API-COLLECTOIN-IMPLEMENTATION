//
const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')

//Nodemailer SETUP 

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PWD  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
})



//SENDMAIL @ /sendMail [POST]
//Private access
const sendEmail = asyncHandler(async(req, res)=>{

    //Alert msg to display on /HOME
    //const alert_msg = ""

    //Get form data
    const {email, feedback} = await req.body
    
    console.log(email)
    
    // setup email data with unicode symbols
    let mailOptions = {
        from: `"MTN-MOMO Contact" ${email}`, // sender address
        to: process.env.EMAIL_USER,
        subject: 'Feedback',  
        text: feedback
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            //console.log(error.responseCode)
            //console.log(error)
            res.send('error')
            //res.render('home', {email_error}) 
        }
        else{
            res.send('success')
        }
        // console.log('Message sent: %s', info.messageId);   
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));  
    })
})


//Export to momoRoutes 
module.exports = sendEmail 