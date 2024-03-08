var timer = function(time) {
    // Get the selected time from the dropdown
    var selectedMinutes = parseInt(time, 10);
    var duration = selectedMinutes * 60 * 1000; // Convert minutes to milliseconds
    var startTime = Date.now();

    // Clear any existing interval to prevent multiple timers running
    clearInterval(window.timerInterval);

    // Start the timer
    window.timerInterval = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        var remainingTime = duration - elapsedTime;

        if (remainingTime >= 0) {
            var minutes = Math.floor(remainingTime / (1000 * 60));
            var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            // Display the remaining time in mm:ss format
            document.getElementById("timer").innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            // When the timer ends
            clearInterval(window.timerInterval);
            document.getElementById("timer").innerHTML = "TIME UP";
        }
    }, 1000); // Update every second
};
document.getElementById("start-btn").addEventListener("click", timer(25));
document.getElementById("break-btn").addEventListener("click", timer(5));
