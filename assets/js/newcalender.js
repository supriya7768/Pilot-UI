//  $(document).ready(function() {
//       // Assuming you have an array of dates and their corresponding numbers
//       const datesWithNumbers = {
//         "2023-11-07": 3,
//         "2023-11-08": 0,
//         "2023-11-09": 5,
//         // Add more dates and numbers here
//       };
    
//       // Function to render the numbers in red bubbles
//       function renderNumbersOnDates() {
//         Object.keys(datesWithNumbers).forEach(function(date) {
//           const bubbleNumber = datesWithNumbers[date];
//           if (bubbleNumber > 0) {
//             const dateCell = $(`#calendar-mini [data-date="${date}"]`);
//             const bubble = $('<div class="event-bubble"></div>').text(bubbleNumber);
//             dateCell.append(bubble);
//           }
//         });
//       }
    
//       // Initial render of bubbles on the calendar
//       renderNumbersOnDates();
    
//       // Function to update the numbers and hide the bubbles when they turn zero
//       function updateNumbersAndBubbles() {
//         Object.keys(datesWithNumbers).forEach(function(date) {
//           const bubbleNumber = datesWithNumbers[date];
//           const dateCell = $(`#calendar-mini [data-date="${date}"]`);
//           const bubble = dateCell.find('.event-bubble');
//           if (bubbleNumber > 0) {
//             datesWithNumbers[date]--; // Decrement the number
//             bubble.text(datesWithNumbers[date]); // Update the bubble text
//           } else {
//             bubble.remove(); // Remove the bubble when the number is zero
//           }
//         });
//       }
    
//       // Simulate decrementing the numbers and updating the bubbles over time
//       setInterval(function() {
//         updateNumbersAndBubbles();
//       }, 1000); // Update every second, change as needed
//     });



//=========================edited by supriya for count=================================================




 $(document).ready(function () {
  // Function to fetch lead counts for all dates
  function fetchLeadCountsForAllDates() {
      // Replace 'http://localhost:8080/get-all-lead-counts' with the actual API endpoint for fetching lead counts for all dates
      fetch('http://localhost:8080/get-all-lead-counts')
          .then(response => response.json())
          .then(data => {
              // Assuming data is an object with the date as the key and lead count as the value
              renderNumbersOnDates(data);
              displayTotalLeadCount(data);
          })
          .catch(error => {
              console.error('Error fetching lead counts: ' + error);
          });
  }

  // Function to render the numbers in red bubbles
  function renderNumbersOnDates(datesWithNumbers) {
      Object.keys(datesWithNumbers).forEach(function (date) {
          const bubbleNumber = datesWithNumbers[date];
          if (bubbleNumber > 0) {
              const dateCell = $(`#calendar-mini [data-date="${date}"]`);
              const bubble = $('<div class="event-bubble"></div>').text(bubbleNumber);
              dateCell.append(bubble);
          }
      });
  }

  // Function to calculate and display the total count of leads
  function displayTotalLeadCount(datesWithNumbers) {
      const totalLeadCount = Object.values(datesWithNumbers).reduce((acc, count) => acc + count, 0);
      // Display the total count wherever you want (replace 'totalCountElement' with the actual ID or selector)
      $('#totalCountElement').text(`Total Leads: ${totalLeadCount}`);
  }

  // Initial fetch and render of lead counts for all dates
  fetchLeadCountsForAllDates();

  // Simulate updating the numbers and bubbles over time
  // setInterval(function () {
  //     fetchLeadCountsForAllDates();
  // }, 1000); // Fetch data every second, change as needed
});


  
    