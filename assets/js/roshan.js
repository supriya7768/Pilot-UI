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
  
    