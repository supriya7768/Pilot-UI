 $(document).ready(function() {
      // Assuming you have an array of dates and their corresponding numbers
      const datesWithNumbers = {
        "2023-11-07": 3,
        "2023-11-08": 0,
        "2023-11-09": 5,
        // Add more dates and numbers here
      };
    
      // Function to render the numbers in red bubbles
      function renderNumbersOnDates() {
        Object.keys(datesWithNumbers).forEach(function(date) {
          const bubbleNumber = datesWithNumbers[date];
          if (bubbleNumber > 0) {
            const dateCell = $(`#calendar-mini [data-date="${date}"]`);
            const bubble = $('<div class="event-bubble"></div>').text(bubbleNumber);
            dateCell.append(bubble);
          }
        });
      }
    
      // Initial render of bubbles on the calendar
      renderNumbersOnDates();
    
      // Function to update the numbers and hide the bubbles when they turn zero
      function updateNumbersAndBubbles() {
        Object.keys(datesWithNumbers).forEach(function(date) {
          const bubbleNumber = datesWithNumbers[date];
          const dateCell = $(`#calendar-mini [data-date="${date}"]`);
          const bubble = dateCell.find('.event-bubble');
          if (bubbleNumber > 0) {
            datesWithNumbers[date]--; // Decrement the number
            bubble.text(datesWithNumbers[date]); // Update the bubble text
          } else {
            bubble.remove(); // Remove the bubble when the number is zero
          }
        });
      }
    
      // Simulate decrementing the numbers and updating the bubbles over time
      setInterval(function() {
        updateNumbersAndBubbles();
      }, 1000); // Update every second, change as needed
    });
  
    