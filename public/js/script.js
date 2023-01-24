

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
  const loading = $('#loading')

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
  //$('[name=feedback]').attr('maxlength', 300)

  //ON FORM SUBMISSION 
  $('#sendMailBtn').on('click', (e)=>{
    e.preventDefault() //Prevent redirection
    
    //XSS
    const email = $('input[name=email]').val().replace(/<[^>]+>/g, '')
    const feedback = $('[name=feedback]').val().replace(/<[^>]+>/g, '')

    //Get Form data
    const feedback_form = {
      email,
      feedback
    }
    
    //Validate empty fields submitted
    if(email =="" || feedback ==""){
      //Update ALERT danger to warning
      warning.removeClass('alert-danger').addClass('alert-warning')

      //Display warning alert 
      warning.removeClass('d-none')

      //Append warning text 
      $('#warning_text').text('Empty fields can not be submitted')
      
      return false //Stop the execution 
    }

    //Validate email address 
    if(IsEmail(email) === false){
      //Update ALERT warning to danger
      warning.removeClass('alert-warning').removeClass('d-none').addClass('alert-danger')
      
      //Update warnig message
      $('#warning_text').text('Please enter a correct Email address')
      //
      return false //Stop the execution 
    }

    //Validate textarea maxlength 
    if(feedback.length > 300){
      //Update ALERT warning to danger
      warning.removeClass('alert-warning').removeClass('d-none').addClass('alert-danger')
      
      //Update warnig message
      $('#warning_text').text('Please set the maxlength back to 300')

      return false //Stop the execution 
    }

    //All good >> Hide Warning and Danger ALERTS 
    warning.addClass('d-none');
    //Remove loading
    loading.removeClass('d-none')

    $.ajax({
      url: '/sendEmail',
      type: "POST",
      data: feedback_form,
      success: function (data) {
        if (data === 'success'){
          //Remove loading
          loading.addClass('d-none')

          //Display Success ALERT 
          success.removeClass('d-none')

          //Reset the form 
          $('form#sendMailForm').trigger('reset')

          //Delay and hide the send btn
          $('#sendMailBtn').hide()

          //console.log(data)
        }
        else{
          //Remove loading
          loading.addClass('d-none')

          alert("Seems like your email address is misspelt. Please check it out!")
        }
      },
      error: function (xhr, exception) {
        //Remove loading
        loading.addClass('d-none')

        alert("Seems like your email address is misspelt. Please check it out!")

        console.log(exception)
      }
    })

  }) 
  //END OF HOME


  // --/PAY

   //Get the alert
   const pay_alert = $('#pay_alert')
   const alertText = $('#pay_alert_text')

  //Form validation before submission 
  $('#reqToPayForm').on('submit', (e)=>
  {
    //Get Form data
    const form = {
      fn : $('[name=fname]').val(),
      ln :  $('[name=lname]').val(),
      number : $('[name=number]').val(),
      // totalAmount : parseInt($('#totalAmount').text()) 
    }
    //Empty form validation 
    if(form.number === "" || form.fn === "" || form.ln === "")
    {
      e.preventDefault()
      //Display alert
      pay_alert.removeClass('d-none')
      
      //Update warnig message
      alertText.text("Please make sure to fill all the required fields")
      //
      return false
    }

    //Validate input maxLength
    if(form.fn.length > 20 || form.ln.length > 20)//14 digits 00242 06 600 60 60
    {
      e.preventDefault()
      //Display alert
      pay_alert.removeClass('d-none')
      
      //Update warnig message
      alertText.text('Kindly set input maxlengths back to their original values')
      //
      return false
    }

    //Validate phone number 
    if(isNaN(form.number) === true || form.number.length >14 || form.number.length <6) //If text entered rather than number
    {
      e.preventDefault()
      //Change input color [For mobile view]
      $('[name=number]').css('background-color', '#ff9999	')
      //Display alert
      pay_alert.removeClass('d-none')
            
      //Update warnig message
      alertText.text("Hey ! That doesn't look like a phone number")
      //
      return false
    }


    //Transaction FAILED 
    if(form.number === '46733123450'){ 
      e.preventDefault()
      //Redirect to failure
      window.location = `/failure/transaction-failed/70b57c320c14410195955a919b338a0c`
      return false
    }

    //Transaction REJECTED 
    if(form.number === '46733123451'){ 
      e.preventDefault()
        //Redirect to failure
        window.location = `/failure/transaction-rejected/70b57c320c14410195955a919b338a0c`
        return false
    }

    //Transaction TIMEOUT 
    if(form.number === '46733123452'){
      e.preventDefault() 
        //Redirect to failure
        window.location = `/failure/transaction-timed out/70b57c320c14410195955a919b338a0c`
        return false
    }

    //All good >> Hide Warning ALERT
    pay_alert.addClass('d-none');

    //Submit
    e.preventDefault = false


  })
  //END OF /PAY


  //Set Phone input bg back to normal 
  $('[name=number]').on('change', ()=>{
    //Validate phone number 
    if(isNaN($(this).val()) === false || $(this).val() <=14 || $(this).val() >=6)
    {
      //Change input color [For mobile view]
      $('[name=number]').css('background-color', '#fff')
    }
  })
    
})
