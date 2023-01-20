

//Enable Bootstrap collapse in /success 
// var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
// var collapseList = collapseElementList.map(function (collapseEl) {
//   return new bootstrap.Collapse(collapseEl)
// })

$(document).ready(function() 
{
  //HOME --DROP A FEEDBACK

  //Get Bootstrap alerts
  const warning = $('#warning_alert')
  const success = $('#success_alert')

  //Email validation function 
  function IsEmail(email) 
  {
    var regex =
    /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    }
    else {
        return true;
    }
  }

  //Limit text area number of char 
  $('[name=feedback]').attr('maxlength', 300)

  //ON FORM SUBMISSION 
  $('#sendMailBtn').on('click', (e)=>{
    e.preventDefault() //Prevent redirection
    //Get Form data
    const feedback_form = {
      email : $('input[name=email]').val(),
      feedback :  $('[name=feedback]').val()
    }

    //Validate empty fields submitted
    if(feedback_form.email =="" || feedback_form.feedback ==""){
      //Update ALERT Ndanger to warning
      warning.removeClass('alert-danger').addClass('alert-warning')

      //Display warning alert 
      warning.removeClass('d-none')

      //Append warning text 
      $('#warning_text').text('Empty fields can not be submitted')
      
      return false //Stop the execution 
    }

    //Validate email address 
    if(IsEmail(feedback_form.email) != true){
      //Update ALERT warning to danger
      warning.removeClass('alert-warning').removeClass('d-none').addClass('alert-danger')
      
      //Update warnig message
      $('#warning_text').text('Please enter a correct Email address')

      return false //Stop the execution 
    }

    //Validate textarea maxlength 
    if(feedback_form.feedback.length > 300){
      //Update ALERT warning to danger
      warning.removeClass('alert-warning').removeClass('d-none').addClass('alert-danger')
      
      //Update warnig message
      $('#warning_text').text('Please set the maxlength back to 300')

      return false //Stop the execution 
    }

    //All good >> Hide Warning and Danger ALERTS 
    warning.addClass('d-none');

    $.ajax({
      url: '/sendEmail',
      type: "POST",
      data: feedback_form,
      success: function (data) {
        //Display Success ALERT 
        success.removeClass('d-none')

        //Reset the form 
        $('form#sendMailForm').trigger('reset')

        //Delay and hide the send btn
        $('#sendMailBtn').delay(1000).hide()

        console.log(data)
      },
      error: function (xhr, exception) {
        console.log(exception)
      }
    })

  }) 

 

  //res.redirect(`/success/${transaction_details.transactionId}`)

  //Redirect to success
  //res.redirect(`/failure/transaction-failed/${transaction_details.transactionId}`)
  //Redirect to success
  //res.redirect(`/failure/transaction-rejected/${transaction_details.transactionId}`)
    
})
