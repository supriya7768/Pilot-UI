

//===================invoice.html===============================


document.addEventListener("DOMContentLoaded", function() {
    // Extract the lead's name and email from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const leadName = urlParams.get("leadName");
    const leadEmail = urlParams.get("leadEmail");

    // Update the name and email in the HTML
    if (leadName) {
        document.getElementById("leadName").textContent = leadName;
    }

    if (leadEmail) {
        document.getElementById("leadEmail").textContent = leadEmail;
    }

    // Update the Edit Invoice button link with the parameters
    const editInvoiceButton = document.getElementById("editInvoiceButton");
    if (editInvoiceButton) {
        editInvoiceButton.href = `edit-invoice.html?leadName=${leadName}&leadEmail=${leadEmail}`;
    }
});


//=================edit-invoice.html==================================


async function addinvoice() {
    const srNo = $('#srno').val();
    const name = $('#leadName').text();;
    const email = $('#leadEmail').text();;
    const mobile = $('#mobile').val();
    const course = $('#course').val();
    const rate = $('#rate').val();
    const amount = $('#amount').val();
    const subtotal = $('#subtotal').val();
    const dueDate = $('#dueDate').val();
    const dueAmount = $('#dueAmount').val();
    const total = $('#total').val();
    

        const url = 'http://localhost:8080/add-invoice';
        const result = await fetch(url, {method:'POST', body: JSON.stringify({
            srNo: srNo,
            name: name,
            email: email,
            mobile: mobile,
            course: course,
            rate: rate,
            amount:amount,
            subtotal:subtotal,
            dueDate:dueDate,
            dueAmount:dueAmount,
            total:total
    
        }), headers: {"Content-Type": "application/json" } });
    
        const finalData = await result.json();

            $('#dt').html(finalData.name  + " invoice is edited");        
        
    }