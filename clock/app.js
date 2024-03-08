function updateClock() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    let dayOfWeek = now.toLocaleString('default', { weekday: 'long' });
    let currentDate = now.toLocaleDateString();

    // Update the day of the week
    document.getElementById('dayOfWeek').textContent = dayOfWeek;

    // Update the current date
    document.getElementById('currentDate').textContent = currentDate;

    // Update the time
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock
updateClock();
