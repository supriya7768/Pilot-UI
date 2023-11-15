//=========================Count of Follow on the calender=================================================

$(document).ready(function () {
  // Function to fetch lead counts for all dates
  function fetchLeadCountsForAllDates() {
    // Replace 'http://localhost:8080/get-all-lead-counts' with the actual API endpoint for fetching lead counts for all dates
    fetch("http://localhost:8080/get-all-lead-counts")
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an object with the date as the key and lead count as the value
        renderNumbersOnDates(data);
        displayTotalLeadCount(data);
      })
      .catch((error) => {
        console.error("Error fetching lead counts: " + error);
      });
  }

  // Modify the renderNumbersOnDates function to handle the addition of bubbles dynamically
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

  function displayTotalLeadCount(datesWithNumbers) {
    const totalLeadCount = Object.values(datesWithNumbers).reduce(
      (acc, count) => acc + count,
      0
    );
    $("#totalCountElement").text(`Total Leads: ${totalLeadCount}`);
  }

  fetchLeadCountsForAllDates();
});
