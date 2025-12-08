var stopwatch = {
    startTime: 0,
    elapsedTime: 0,
    timerInterval: null,
    isRunning: false,
    laps: [],

    init: function () {
        this.updateDisplay();
    },

    start: function () {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => this.updateTimer(), 10);
            this.isRunning = true;

            // Update UI
            document.getElementById('startBtn').disabled = true;
            document.getElementById('pauseBtn').disabled = false;
            document.getElementById('lapBtn').disabled = false;
            document.getElementById('timeDisplay').classList.add('running');
        }
    },

    pause: function () {
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.isRunning = false;

            // Update UI
            document.getElementById('startBtn').disabled = false;
            document.getElementById('pauseBtn').disabled = true;
            document.getElementById('lapBtn').disabled = true;
            document.getElementById('timeDisplay').classList.remove('running');
        }
    },

    reset: function () {
        clearInterval(this.timerInterval);
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.laps = [];

        // Update UI
        this.updateDisplay();
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('lapBtn').disabled = true;
        document.getElementById('timeDisplay').classList.remove('running');
        document.getElementById('lapsSection').style.display = 'none';
    },

    updateTimer: function () {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateDisplay();
    },

    updateDisplay: function () {
        const time = this.formatTime(this.elapsedTime);
        document.getElementById('timeDisplay').textContent = time;
    },

    formatTime: function (milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);

        return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}.${this.pad(ms)}`;
    },

    pad: function (number) {
        return number.toString().padStart(2, '0');
    },

    recordLap: function () {
        if (this.isRunning) {
            const lapTime = this.elapsedTime;
            const lapNumber = this.laps.length + 1;

            this.laps.push({
                number: lapNumber,
                time: lapTime,
                formattedTime: this.formatTime(lapTime)
            });

            this.renderLaps();

            // Show laps section
            document.getElementById('lapsSection').style.display = 'block';
        }
    },

    renderLaps: function () {
        const lapsList = document.getElementById('lapsList');

        // Find fastest and slowest laps
        let fastest = null;
        let slowest = null;

        if (this.laps.length > 1) {
            fastest = this.laps.reduce((min, lap) => lap.time < min.time ? lap : min, this.laps[0]);
            slowest = this.laps.reduce((max, lap) => lap.time > max.time ? lap : max, this.laps[0]);
        }

        // Render laps in reverse order (newest first)
        lapsList.innerHTML = this.laps.slice().reverse().map(lap => {
            let badgeHtml = '';
            let itemClass = 'lap-item';

            if (this.laps.length > 1) {
                if (lap.number === fastest.number) {
                    itemClass += ' fastest';
                    badgeHtml = '<span class="lap-badge fastest">Fastest</span>';
                } else if (lap.number === slowest.number) {
                    itemClass += ' slowest';
                    badgeHtml = '<span class="lap-badge slowest">Slowest</span>';
                }
            }

            return `
                <div class="${itemClass}">
                    <div class="lap-number">
                        <i class="fas fa-flag-checkered"></i>
                        Lap ${lap.number}
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div class="lap-time">${lap.formattedTime}</div>
                        ${badgeHtml}
                    </div>
                </div>
            `;
        }).join('');
    },

    clearLaps: function () {
        if (confirm('Clear all lap times?')) {
            this.laps = [];
            document.getElementById('lapsSection').style.display = 'none';
        }
    }
};

// Initialize stopwatch when page loads
document.addEventListener('DOMContentLoaded', function () {
    stopwatch.init();
});
