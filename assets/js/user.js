//===========================field in addlead.html========================

function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  if (validateForm()) {
    addlead(); // If form is valid, proceed with adding the lead
  }
}

function validateForm() {
  let isValid = true;
  const formFields = document.querySelectorAll("input[required]");

  formFields.forEach((field) => {
    if (!field.value) {
      isValid = false;
      field.classList.add("error"); // You can style this using CSS for better visibility
      field.setAttribute("title", "Please enter mandatory fields*");
    } else {
      field.classList.remove("error");
      field.removeAttribute("title");
    }
  });

  return isValid;
}
function displayTooltipsForRequiredFields() {
  const formFields = document.querySelectorAll("input[required]");

  formFields.forEach((field) => {
    if (!field.value) {
      field.classList.add("error"); // Apply error class to highlight the field
      field.setAttribute("title", "Please enter mandatory fields*"); // Show tooltip
    } else {
      field.classList.remove("error");
      field.removeAttribute("title");
    }
  });
}

function formatName(name) {
  // Split the name into words
  const words = name.split(" ");

  // Capitalize the first letter of each word
  const formattedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the formatted words back into a string
  const formattedName = formattedWords.join(" ");

  return formattedName;
}

async function addlead() {
  const name = $("#name").val();
  const formattedName = formatName(name);
  const email = $("#email").val();
  const mobile = $("#mobile").val();
  const address = $("#address").val();
  const courseIntrested = $("#course").val();
  const mode = $("#mode").val();
  const courseDoneInOtherInstitute = $("#courseInOtherInstitute").val();
  const instituteName = $("#institute").val();
  const reason = $("#reason").val();
  const interest = $("#interest").val();
  const degree = $("#degree").val();
  const field = $("#field").val();
  const passingYear = $("#passingYear").val();
  const collegeName = $("#collegeName").val();
  const experience = $("#experience").val();
  const yearOfPassing = $("#yearOfExperience").val();
  const designation = $("#designation").val();
  const approach = $("#approach").val();
  const referenceName = $("#reference").val();
  const batchCode = $("#batchCode").val();
  const status = $("#status").val();
  const comment = $("#comment").val();
  const follow = $("#follow").val();
  const date = $("#date").val();

  if (!isValidMobileNumber(mobile)) {
    $("#dt").html("Error: Invalid mobile number.");
    return;
  }

  if (!isValidEmail(email)) {
    $("#dt").html("Error: Invalid email address. Please enter a valid email.");
    return;
  }

  const url = "http://localhost:8080/add-lead";
  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: formattedName,
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
      comment: comment,
      follow: follow,
      date: date,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const finalData = await result.text(); // Assuming the response is plain text

  if (finalData.includes("Entry not done. Email or mobile already exists.")) {
    $("#dt").html("Error: Email or mobile already exists.");
  } else {
    $("#dt").html(finalData);
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  // After adding the lead, fetch and update the lead data in leadlist.html
  // fetchLeadData();
}

function isValidMobileNumber(mobile) {
  // Regular expression to validate a 10-digit mobile number starting with 6, 7, 8, or 9
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
}

function isValidEmail(email) {
  // Regular expression to validate an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
const yearOfExperienceElement = document.getElementById(
  "selectYearOfExperience"
);
const designationElement = document.getElementById("selectDesignation");

selectExperience.addEventListener("change", function () {
  if (selectExperience.value === "it") {
    yearOfExperienceElement.style.display = "block";
    designationElement.style.display = "block";
  } else {
    yearOfExperienceElement.style.display = "none";
    designationElement.style.display = "none";
  }
});

const selectApproach = document.getElementById("approach");
const refElement = document.getElementById("selectRef");
const batchElement = document.getElementById("selectBatch");

selectApproach.addEventListener("change", function () {
  if (selectApproach.value === "ref") {
    refElement.style.display = "block";
    batchElement.style.display = "block";
  } else {
    refElement.style.display = "none";
    batchElement.style.display = "none";
  }
});

const statusElement = document.getElementById("status");
const followOnFieldElement = document.getElementById("followOnField");

statusElement.addEventListener("change", function () {
  if (statusElement.value === "Active" || statusElement.value === "Pending") {
    followOnFieldElement.style.display = "block";
  } else {
    followOnFieldElement.style.display = "none";
    // Optionally, you can clear the followOnField value when it's hidden
    document.getElementById("follow").value = "";
  }
});

function showSubDropdown(dropdown) {
  const selectedOption = dropdown.value;

  document.getElementById("subDropdown1").style.display = "none";
  document.getElementById("subDropdown2").style.display = "none";

  if (selectedOption === "option1") {
    document.getElementById("subDropdown1").style.display = "block";
  } else if (selectedOption === "option2") {
    document.getElementById("subDropdown2").style.display = "block";
  }
}
