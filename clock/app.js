var clock = {
    is24Hour: false,
    intervalId: null,

    init: function () {
        this.updateClock();
        this.intervalId = setInterval(() => this.updateClock(), 1000);
    },

    updateClock: function () {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');

        // Format based on 12h or 24h
        let displayHours;
        let ampm = '';

        if (this.is24Hour) {
            displayHours = hours.toString().padStart(2, '0');
        } else {
            ampm = hours >= 12 ? 'PM' : 'AM';
            displayHours = hours % 12;
            displayHours = displayHours ? displayHours : 12; // Convert 0 to 12
            displayHours = displayHours.toString().padStart(2, '0');
        }

        // Get day of week
        let dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });

        // Get current date
        let currentDate = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Update the DOM
        document.getElementById('clock').textContent = `${displayHours}:${minutes}:${seconds}`;

        if (!this.is24Hour) {
            document.getElementById('ampm').textContent = ampm;
            document.getElementById('ampm').style.display = 'block';
        } else {
            document.getElementById('ampm').style.display = 'none';
        }

        document.getElementById('dayOfWeek').textContent = dayOfWeek;
        document.getElementById('currentDate').textContent = currentDate;
    },

    toggleFormat: function () {
        this.is24Hour = !this.is24Hour;

        // Update button text
        const formatText = document.getElementById('format-text');
        if (this.is24Hour) {
            formatText.textContent = 'Switch to 12h';
            document.querySelector('.clock-container').classList.add('format-24h');
        } else {
            formatText.textContent = 'Switch to 24h';
            document.querySelector('.clock-container').classList.remove('format-24h');
        }

        // Update clock immediately
        this.updateClock();
    }
};

// Initialize clock when page loads
document.addEventListener('DOMContentLoaded', function () {
    clock.init();
});
