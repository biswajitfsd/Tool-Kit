var timer = {
    intervalId: null,
    remainingTime: 0,
    totalTime: 0,
    isRunning: false,
    currentPreset: 25,
    sessionCount: 0,
    isBreakMode: false,
    currentLabel: 'Focus Time',

    setPreset: function (minutes, label) {
        if (this.isRunning) {
            return;
        }

        this.currentPreset = minutes;
        this.currentLabel = label;
        this.remainingTime = minutes * 60 * 1000;
        this.totalTime = this.remainingTime;
        this.updateDisplay();
        this.updateProgressRing();

        // Update active preset button
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-minutes') == minutes) {
                btn.classList.add('active');
            }
        });

        // Update session label
        document.getElementById('sessionLabel').textContent = label;

        // Remove break mode if switching presets
        document.querySelector('.pomodoro-container').classList.remove('break-mode');
        this.isBreakMode = false;
    },

    start: function () {
        if (this.isRunning) {
            return;
        }

        // If timer is at 0, reset to current preset
        if (this.remainingTime <= 0) {
            this.remainingTime = this.currentPreset * 60 * 1000;
            this.totalTime = this.remainingTime;
        }

        this.isRunning = true;

        // Update button visibility
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('stop-btn').style.display = 'flex';
        document.getElementById('rest-btn').style.display = 'none';

        // Remove completed state
        document.querySelector('.pomodoro-container').classList.remove('completed');

        var tick = function () {
            if (this.remainingTime > 0) {
                this.remainingTime -= 1000;
                this.updateDisplay();
                this.updateProgressRing();
            } else {
                this.complete();
            }
        };

        tick = tick.bind(this);
        this.intervalId = setInterval(tick, 1000);
    },

    stop: function () {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.intervalId = null;

        // Reset timer
        this.remainingTime = this.currentPreset * 60 * 1000;
        this.totalTime = this.remainingTime;
        this.updateDisplay();
        this.updateProgressRing();

        // Update button visibility
        document.getElementById('start-btn').style.display = 'flex';
        document.getElementById('stop-btn').style.display = 'none';
        document.getElementById('rest-btn').style.display = 'none';

        // Remove completed state
        document.querySelector('.pomodoro-container').classList.remove('completed');
        document.querySelector('.pomodoro-container').classList.remove('break-mode');
    },

    complete: function () {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.intervalId = null;

        // Update display
        document.getElementById('timer').textContent = "TIME UP!";

        // Add completed state
        document.querySelector('.pomodoro-container').classList.add('completed');

        // Increment session count if not in break mode
        if (!this.isBreakMode) {
            this.sessionCount++;
            document.getElementById('sessionCount').textContent = this.sessionCount;
        }

        // Update button visibility
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('stop-btn').style.display = 'none';
        document.getElementById('rest-btn').style.display = 'flex';

        // Play completion sound (optional)
        this.playCompletionSound();
    },

    takeBreak: function () {
        this.isBreakMode = true;
        this.currentPreset = 5;
        this.currentLabel = 'Break Time';
        this.remainingTime = 5 * 60 * 1000;
        this.totalTime = this.remainingTime;

        // Update UI
        document.getElementById('sessionLabel').textContent = 'Break Time';
        document.querySelector('.pomodoro-container').classList.add('break-mode');
        document.querySelector('.pomodoro-container').classList.remove('completed');

        // Update button visibility
        document.getElementById('start-btn').style.display = 'flex';
        document.getElementById('stop-btn').style.display = 'none';
        document.getElementById('rest-btn').style.display = 'none';

        // Update display
        this.updateDisplay();
        this.updateProgressRing();

        // Auto-start break after a short delay
        setTimeout(() => this.start(), 100);
    },

    updateDisplay: function () {
        var minutes = Math.floor(this.remainingTime / (1000 * 60));
        var seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);

        document.getElementById('timer').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },

    updateProgressRing: function () {
        const circle = document.getElementById('progressCircle');
        const radius = parseFloat(circle.getAttribute('r'));
        const circumference = 2 * Math.PI * radius;

        const progress = this.remainingTime / this.totalTime;
        const offset = circumference * (1 - progress);

        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
    },

    playCompletionSound: function () {
        // Optional: Add audio notification
        try {
            // Create a simple beep sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio notification not supported:', e);
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Set initial display
    timer.setPreset(25, 'Focus Time');

    // Update session count display
    document.getElementById('sessionCount').textContent = timer.sessionCount;
});
