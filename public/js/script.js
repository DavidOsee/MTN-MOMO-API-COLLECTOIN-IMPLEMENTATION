

//Enable Bootstrap collapse in /success 
// var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
// var collapseList = collapseElementList.map(function (collapseEl) {
//   return new bootstrap.Collapse(collapseEl)
// })

$(document).ready(function() 
{
    //-- Process route

    //Get transaction status
    const transaction_status = $('#transaction_status').val()
    const transactionID = $('#transactionID').val()

    //Check the status of the transaction
    const transaction_processing = ()=>{

        //Redirect to success if SUCCESS
        window.location = `/success/${transactionID}` 

        //ClearTimeout
        clearF()
    }

  //SetTimout and redirect to success/Failure
  const timeOut = setTimeout(transaction_processing, 5000) //Process for 5s before redirecting

  //ClearTimeOut Function 
  const clearF = () => {
    clearTimeout(timeOut);
  }
    //res.redirect(`/success/${transaction_details.transactionId}`)

    //Redirect to success
    //res.redirect(`/failure/transaction-failed/${transaction_details.transactionId}`)
    //Redirect to success
    //res.redirect(`/failure/transaction-rejected/${transaction_details.transactionId}`)
    
});
