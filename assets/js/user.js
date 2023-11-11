        
        
        //================addlead.html=================


        function submitForm(event) {
            event.preventDefault(); // Prevent the default form submission behavior
            if (validateForm()) {
              addlead(); // If form is valid, proceed with adding the lead
            }
          }
          
          function validateForm() {
            let isValid = true;
            const formFields = document.querySelectorAll('input[required]');
          
            formFields.forEach(field => {
              if (!field.value) {
                isValid = false;
                field.classList.add('error'); // You can style this using CSS for better visibility
                field.setAttribute('title', 'Please enter mandatory fields*');
              } else {
                
                field.classList.remove('error');
                field.removeAttribute('title');
              }
            });
          
            return isValid;
          }
          function displayTooltipsForRequiredFields() {
            const formFields = document.querySelectorAll('input[required]');
            
            formFields.forEach(field => {
                if (!field.value) {
                    field.classList.add('error'); // Apply error class to highlight the field
                    field.setAttribute('title', 'Please enter mandatory fields*'); // Show tooltip
                } else {
                    field.classList.remove('error');
                    field.removeAttribute('title');
                }
            });
        }
          
         
         
        
         async function addlead() {
            const name = $('#name').val();
            const email = $('#email').val();
            const mobile = $('#mobile').val();
            const address = $('#address').val();
            const courseIntrested = $('#course').val();
            const mode = $('#mode').val();
            const courseDoneInOtherInstitute = $('#courseInOtherInstitute').val();
            const instituteName = $('#institute').val();
            const reason = $('#reason').val();
            const interest = $('#interest').val();
            const degree = $('#degree').val();
            const field = $('#field').val();
            const passingYear = $('#passingYear').val();
            const collegeName = $('#collegeName').val();
            const experience = $('#experience').val();
            const yearOfPassing = $('#yearOfExperience').val();
            const designation = $('#designation').val();
            const approach = $('#approach').val();
            const referenceName = $('#reference').val();
            const batchCode = $('#batchCode').val();
            const status = $('#status').val();
            const comment = $('#comment').val();
            const follow = $('#follow').val();
            const date = $('#date').val();
        
                const url = 'http://localhost:8080/add-lead';
                const result = await fetch(url, {method:'POST', body: JSON.stringify({
                    name: name,
                    email: email,
                    mobile: mobile,
                    address: address,
                    courseIntrested: courseIntrested,
                    mode: mode,
                    courseDoneInOtherInstitute: courseDoneInOtherInstitute,
                    instituteName: instituteName,
                    reason: reason,
                    interest: interest,
                    degree: degree,
                    field: field,
                    passingYear: passingYear,
                    collegeName: collegeName,
                    experience: experience,
                    yearOfPassing: yearOfPassing,
                    designation: designation,
                    approach: approach,
                    referenceName: referenceName,
                    batchCode: batchCode,
                    status: status,
                    comment:comment,
                    follow: follow,
                    date: date
            
                }), headers: {"Content-Type": "application/json" } });
            
                const finalData = await result.json();
        
                 if (finalData.email != null || finalData.mobile != null) {
                    $('#dt').html(finalData.name  + " is added as lead");        
                 } else {
                     $('#dt').html("Error:- Your email is already in use. Please use new email"); 
                 }
                 // After adding the lead, fetch and update the lead data in leadlist.html
                 fetchLeadData()
            }



        //=================================leadlist.html=====================    


        function fetchLeadData() {
            fetch('http://localhost:8080/get-lead-data')
                .then(response => response.json())
                .then(data => {
                    const leadData = document.getElementById('leadData');
                    // Clear existing data
                    // leadData.innerHTML = '';
        
                    data.forEach(lead => {
                        const row = document.createElement('tr');
                        // let sts = lead.status;
                        // sts = sts.charAt(0).toUpperCase()+sts.slice(1);
                        // console.log(sts);
                        row.innerHTML = `
                            <td>${lead.name}</td>
                            <td>${lead.mobile}</td>
                            <td>${lead.email}</td>
                            <td>${lead.courseIntrested}</td>
                            <td class="${getButtonClass(lead.status)}">${lead.status}</td>
                            <td><div class="action">
                                ${
                                    (lead.status.toLowerCase().trim() === 'pending') ? `
                                        <select onchange="changeStatus(this)">
                                            <option value="">Edit</option>
                                            <option value="active">Active</option>
                                            <option value="done">Done</option>
                                            <option value="close">Close</option>
                                        </select>
                                    ` :
                                    (lead.status.toLowerCase().trim() === 'active') ? `
                                        <select onchange="changeStatus(this)">
                                            <option value="">Edit</option>
                                            <option value="pending">Pending</option>
                                            <option value="done">Done</option>
                                            <option value="close">Close</option>
                                        </select>
                                    ` :
                                    (lead.status.toLowerCase().trim() === 'done') ? `
                                        <a href="invoice.html?leadName=${lead.name}&leadEmail=${lead.email}" class="create-invoice-link">
                                            Invoice
                                        </a>
                                    ` :
                                    (lead.status.toLowerCase().trim() === 'close') ? `
                                        <a style="color: red;">Delete</a>
                                    ` :
                                    ''
                                }
                            </div></td>
                        `;
                        console.log(row);
                        leadData.appendChild(row);
                        
                    });
                })
                .catch(error => {
                    console.error('Error fetching data: ' + error);
                });
        }
        
        function getButtonClass(status) {
            // Trim the status and convert to lowercase for comparison
            const lowerCaseStatus = status.trim().toLowerCase();
        
            switch (lowerCaseStatus) {
                case 'active':
                    return 'newbtnact';
                case 'done':
                    return 'newbtndone';
                case 'close':
                    return 'newbtnclose';
                case 'pending':
                    return 'newbtnpending';
                default:
                    return 'default-btn'; // You can define a default class for other statuses
            }
        }
        
        function changeStatus(selectElement) {
            const selectedStatus = selectElement.value;
            console.log(selectedStatus);
            const row = selectElement.closest('tr');
            const statusCell = row.querySelector('td:nth-child(5)');
            const actionCell = row.querySelector('td:nth-child(6)');
        
            if (selectedStatus === 'done') {
                if (confirm('Do you want to change status as Done?')) {
                    statusCell.textContent = selectedStatus;
                    statusCell.className = getButtonClass(selectedStatus);
                    // Change action cell content to a link to invoice.html with name and email
                    actionCell.innerHTML = getActionHTML(selectedStatus, row.cells[0].textContent, row.cells[2].textContent);
                } else {
                    // Revert to the previous status (assuming you have a way to track it)
                    selectElement.value = statusCell.textContent;
                }
            } else {
                statusCell.textContent = selectedStatus;
                statusCell.className = getButtonClass(selectedStatus);
                actionCell.innerHTML = getActionHTML(selectedStatus);
            }
        }
        
        
        
        // Rest of your code...
        
        
        function getActionHTML(status, name, email) {
            if (status === 'done') {
                return `
                    <a href="invoice.html?leadName=${name}&leadEmail=${email}" class="create-invoice-link">
                        Invoice
                    </a>
                `;
            } else if (status === 'close') {
                return `
                    <a style="color: red;">Delete</a>
                `;
            } else if (status === 'active') {
                return `
                    <select onchange="changeStatus(this)">
                        <option value="">Edit</option>
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                        <option value="close">Close</option>
                    </select>
                `;
            } else if (status === 'pending') {
                return `
                    <select onchange="changeStatus(this)">
                        <option value="">Edit</option>
                        <option value="active">Active</option>
                        <option value="done">Done</option>
                        <option value="close">Close</option>
                    </select>
                `;
            } else {
                return '';
            }
        }
        
        
        // Call the fetchLeadData function when the page loads
        window.onload = fetchLeadData;
        
        



       //===========================field in addlead.html========================
       
       
       const selectElement = document.getElementById("courseInOtherInstitute");
       const otherOptionsElement = document.getElementById("otherOptions");
       const otherOptionElement = document.getElementById("otherOption"); 
     
       selectElement.addEventListener("change", function () {
           if (selectElement.value === "yes") {
               otherOptionsElement.style.display = "block";
               otherOptionElement.style.display = "block";
           } else {
               otherOptionsElement.style.display = "none";
               otherOptionElement.style.display = "none";
           }
       });
     
     
       const selectExperience = document.getElementById("experience");
       const yearOfExperienceElement = document.getElementById("selectYearOfExperience");
       const designationElement = document.getElementById("selectDesignation");
     
         selectExperience.addEventListener("change", function(){
     
             if(selectExperience.value === "it"){
                 yearOfExperienceElement.style.display = "block";
                 designationElement.style.display= "block";
             }else{
                 yearOfExperienceElement.style.display = "none";
                 designationElement.style.display = "none";
             }
         });

    
    const selectApproach = document.getElementById("approach");
    const refElement = document.getElementById("selectRef");
    const  batchElement  = document.getElementById("selectBatch");
  
    selectApproach.addEventListener("change", function(){
      if(selectApproach.value === "ref"){
          refElement.style.display = "block";
          batchElement.style.display = "block";
      }else {
          refElement.style.display = "none";
          batchElement.style.display = "none";
      }
    });

   
function showSubDropdown(dropdown) {
    const selectedOption = dropdown.value;
    
    document.getElementById('subDropdown1').style.display = 'none';
    document.getElementById('subDropdown2').style.display = 'none';

    if (selectedOption === 'option1') {
        document.getElementById('subDropdown1').style.display = 'block';
    } else if (selectedOption === 'option2') {
        document.getElementById('subDropdown2').style.display = 'block';
    }
}

    
    //=========================index.html==================================
 

    function  fetchLeadData() {
        fetch('http://localhost:8080/get-lead-data-dashboard')
            .then(response => response.json())
            .then(data => {
                const leadData = document.getElementById('leadTable');
                // Clear existing data
                //leadData.innerHTML = '';

            const currentDate = new Date();
            const currentDateString = currentDate.toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format


                data.forEach(lead => {
                    const followDate = lead.follow.split('T')[0]; // Assuming the follow date is in 'YYYY-MM-DD' format
                    if (followDate === currentDateString) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${lead.name}</td>
                        <td>${lead.mobile}</td>
                        <td>${lead.comment}</td>
                        <td>${lead.follow}</td>
                        <td class="${getButtonClass(lead.status)}">${lead.status}</td>
                            <td><div class="action">
                                ${
                                    (lead.status.toLowerCase().trim() === 'pending') ? `
                                    <select onchange="changeStatus(this, ${lead.id})">
                                    <option value="">Edit</option>
                                    <option value="active">Active</option>
                                    <option value="done">Done</option>
                                    <option value="close">Close</option>
                                </select>
                                    ` :
                                    (lead.status.toLowerCase().trim() === 'active') ? `
                                        <select onchange="changeStatus(this, ${lead.id})">
                                            <option value="">Edit</option>
                                            <option value="pending">Pending</option>
                                            <option value="done">Done</option>
                                            <option value="close">Close</option>
                                        </select>
                                    ` :
                                    (lead.status.toLowerCase().trim() === 'done') ? `
                                        <a href="invoice.html?leadName=${lead.name}&leadEmail=${lead.email}" class="create-invoice-link">
                                            Invoice
                                        </a>
                                    ` :
                                    (lead.status.toLowerCase().trim() === 'close') ? `
                                        <a style="color: red;">Delete</a>
                                    ` :
                                    ''
                                }
                            </div></td>
                        `;
                        console.log(row);
                        leadData.appendChild(row);
                            }
                    });
                })
                .catch(error => {
                    console.error('Error fetching data: ' + error);
                });
        }
        
        function getButtonClass(status) {
            // Trim the status and convert to lowercase for comparison
            const lowerCaseStatus = status.trim().toLowerCase();
        
            switch (lowerCaseStatus) {
                case 'active':
                    return 'newbtnact';
                case 'done':
                    return 'newbtndone';
                case 'close':
                    return 'newbtnclose';
                case 'pending':
                    return 'newbtnpending';
                default:
                    return 'default-btn'; // You can define a default class for other statuses
            }
        }
        
        function changeStatus(selectElement, leadId) {
            const selectedStatus = selectElement.value;
            const row = selectElement.closest('tr');
            const statusCell = row.querySelector('td:nth-child(5)');
            const actionCell = row.querySelector('td:nth-child(6)'); // Corrected the typo here
        
            if (confirm(`Do you want to change status to '${selectedStatus}'?`)) {
                updateLeadStatus(leadId, selectedStatus, statusCell, actionCell, row); // Call the updated function
                
            } else {
                // Revert to the previous status (assuming you have a way to track it)
                selectElement.value = statusCell.textContent;
            }

          
        }

        async function updateLeadStatus(leadId, selectedStatus, statusCell, actionCell, row) {
            try {
                const response = await fetch(`http://localhost:8080/update-lead/${leadId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: selectedStatus })
                });
        
                if (response.ok) {
                    const data = await response.json();
                    const updatedStatus = data.status;
                   
        
                    // Update the status and action cells
                    statusCell.textContent = updatedStatus;
                    statusCell.className = getButtonClass(updatedStatus);
                    actionCell.innerHTML = getActionHTML(updatedStatus, row.cells[0].textContent, row.cells[2].textContent);
                    console.log("Before status changed")
                    alert(`Status changed to '${updatedStatus}'`);
                    console.log("Before return statement");
                    return updatedStatus; 
                    // Return the updated status
                } else {
                    console.error('Failed to update lead status');
                    // Handle error cases
                }
            } catch (error) {
                console.error('Error updating lead status: ' + error);
            }
        }
        
        function getActionHTML(status, name, email) {
            if (status === 'done') {
                return `
                    <a href="invoice.html?leadName=${name}&leadEmail=${email}" class="create-invoice-link">
                        Invoice
                    </a>
                `;
            } else if (status === 'close') {
                return `
                    <a style="color: red;">Delete</a>
                `;
            } else if (status === 'active') {
                return `
                    <select onchange="changeStatus(this)">
                        <option value="">Edit</option>
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                        <option value="close">Close</option>
                    </select>
                `;
            } else if (status === 'pending') {
                return `
                    <select onchange="changeStatus(this)">
                        <option value="">Edit</option>
                        <option value="active">Active</option>
                        <option value="done">Done</option>
                        <option value="close">Close</option>
                    </select>
                `;
            } else {
                return '';
            }
        }
        
        
        // Call the fetchLeadData function when the page loads
        window.onload = fetchLeadData;