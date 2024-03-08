function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours.toString().padStart(2, '0');
    let dayOfWeek = now.toLocaleString('default', { weekday: 'long' });
    let currentDate = now.toLocaleDateString();

    // Update the day of the week
    document.getElementById('dayOfWeek').textContent = dayOfWeek;

    // Update the current date
    document.getElementById('currentDate').textContent = currentDate;

    // Update the time in AM/PM format
    document.getElementById('clock').innerHTML = `${hours}:${minutes}:${seconds} <sub>${ampm}<sub>`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock
updateClock();
