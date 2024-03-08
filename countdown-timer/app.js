// Set the date we're counting down to
var countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();
    
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the result in the element with id="timer"
    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    
    // If the count down is finished, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}, 1000);

document.getElementById("start-btn").addEventListener("click", function() {
    var selectedTime = document.getElementById("time-picker").value;

    // Get current date
    var currentDate = new Date();
    var dateString = currentDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"

    // Combine current date with selected time
    if (selectedTime) {
        var countDownDateTime = new Date(dateString + "T" + selectedTime);

        // Check if selected time is already past, adjust to next day
        if (countDownDateTime <= currentDate) {
            countDownDateTime.setDate(countDownDateTime.getDate() + 1);
        }
    } else {
        alert("Please select a time.");
        return;
    }

    // Clear any existing countdown interval
    clearInterval(window.countdownInterval);

    // Start the countdown
    window.countdownInterval = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDateTime.getTime() - now;

        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(window.countdownInterval);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
});
