         //========addlead.html==========

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
                    status: status
            
                }), headers: {"Content-Type": "application/json" } });
            
                const finalData = await result.json();
        
                 if (finalData.email != null || finalData.mobile != null) {
                    $('#dt').html(finalData.name  + " is registered");        
                 } else {
                     $('#dt').html("Error:- Your email is already in use. Please use new email"); 
                 }
            } 