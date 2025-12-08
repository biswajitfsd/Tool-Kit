var breathingApp = {
    // Breathing patterns (times in milliseconds)
    patterns: {
        '478': {
            name: '4-7-8 Breathing',
            description: '4-7-8 breathing is a relaxation technique that promotes calmness and reduces stress. Inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds.',
            inhale: 4000,
            hold1: 7000,
            exhale: 8000,
            hold2: 0
        },
        'box': {
            name: 'Box Breathing',
            description: 'Box breathing is used by Navy SEALs for stress management. Equal timing for all phases creates a balanced, calming rhythm. Inhale, hold, exhale, and hold again for 4 seconds each.',
            inhale: 4000,
            hold1: 4000,
            exhale: 4000,
            hold2: 4000
        },
        'deep': {
            name: 'Deep Breathing',
            description: 'Deep breathing combines long inhales and exhales with brief holds. This pattern energizes while maintaining calm. Inhale for 6 seconds, hold for 2 seconds, exhale for 6 seconds.',
            inhale: 6000,
            hold1: 2000,
            exhale: 6000,
            hold2: 2000
        }
    },

    // State
    currentPattern: '478',
    duration: 180, // 3 minutes default
    isRunning: false,
    isPaused: false,
    currentPhase: 'ready',
    phaseStartTime: 0,
    phaseDuration: 0,
    cycleCount: 0,
    totalCycles: 0,
    sessionStartTime: 0,
    elapsedTime: 0,
    animationFrame: null,

    // Elements
    circle: null,
    phaseText: null,
    phaseTimer: null,
    cycleCounter: null,
    startBtn: null,
    pauseBtn: null,
    statTime: null,
    statCycles: null,
    statsSection: null,

    // Initialize
    init: function () {
        this.circle = document.getElementById('breathingCircle');
        this.phaseText = document.getElementById('phaseText');
        this.phaseTimer = document.getElementById('phaseTimer');
        this.cycleCounter = document.getElementById('cycleCounter');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.statTime = document.getElementById('statTime');
        this.statCycles = document.getElementById('statCycles');
        this.statsSection = document.getElementById('statsSection');

        this.updatePatternInfo();
        this.calculateTotalCycles();
    },

    // Select pattern
    selectPattern: function (pattern) {
        if (this.isRunning) {
            this.reset();
        }

        this.currentPattern = pattern;

        // Update button states
        document.querySelectorAll('.pattern-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-pattern="${pattern}"]`).classList.add('active');

        this.updatePatternInfo();
        this.calculateTotalCycles();
    },

    // Set duration
    setDuration: function (seconds) {
        if (this.isRunning) {
            return;
        }

        this.duration = seconds;

        // Update button states
        document.querySelectorAll('.duration-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-duration="${seconds}"]`).classList.add('active');

        this.calculateTotalCycles();
    },

    // Calculate total cycles for duration
    calculateTotalCycles: function () {
        const pattern = this.patterns[this.currentPattern];
        const cycleTime = pattern.inhale + pattern.hold1 + pattern.exhale + pattern.hold2;
        this.totalCycles = Math.floor((this.duration * 1000) / cycleTime);
        this.cycleCounter.textContent = `Ready - ${this.totalCycles} cycles`;
    },

    // Update pattern info
    updatePatternInfo: function () {
        const pattern = this.patterns[this.currentPattern];
        document.getElementById('patternDescription').textContent = pattern.description;
    },

    // Start session
    start: function () {
        if (this.isRunning) return;

        this.isRunning = true;
        this.isPaused = false;
        this.sessionStartTime = Date.now();
        this.cycleCount = 0;
        this.elapsedTime = 0;

        // Show/hide buttons
        this.startBtn.style.display = 'none';
        this.pauseBtn.style.display = 'flex';
        this.statsSection.style.display = 'grid';

        // Start first phase
        this.startPhase('inhale');
        this.animate();
    },

    // Pause session
    pause: function () {
        if (!this.isRunning) return;

        if (this.isPaused) {
            // Resume
            this.isPaused = false;
            this.phaseStartTime = Date.now();
            this.pauseBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
            this.animate();
        } else {
            // Pause
            this.isPaused = true;
            this.pauseBtn.innerHTML = '<i class="fas fa-play"></i><span>Resume</span>';
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
        }
    },

    // Reset session
    reset: function () {
        this.isRunning = false;
        this.isPaused = false;
        this.currentPhase = 'ready';
        this.cycleCount = 0;
        this.elapsedTime = 0;

        // Cancel animation
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        // Reset UI
        this.phaseText.textContent = 'Ready';
        this.phaseTimer.textContent = '0s';
        this.cycleCounter.textContent = `Ready - ${this.totalCycles} cycles`;

        this.circle.style.transform = 'scale(1)';
        this.circle.className = 'breathing-circle';

        // Show/hide buttons
        this.startBtn.style.display = 'flex';
        this.pauseBtn.style.display = 'none';
        this.pauseBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
        this.statsSection.style.display = 'none';
    },

    // Start a breathing phase
    startPhase: function (phase) {
        this.currentPhase = phase;
        this.phaseStartTime = Date.now();

        const pattern = this.patterns[this.currentPattern];

        // Set phase duration
        if (phase === 'inhale') {
            this.phaseDuration = pattern.inhale;
            this.phaseText.textContent = 'Breathe In';
            this.circle.className = 'breathing-circle inhale';
        } else if (phase === 'hold1' || phase === 'hold2') {
            this.phaseDuration = phase === 'hold1' ? pattern.hold1 : pattern.hold2;
            this.phaseText.textContent = 'Hold';
            this.circle.className = 'breathing-circle hold';
        } else if (phase === 'exhale') {
            this.phaseDuration = pattern.exhale;
            this.phaseText.textContent = 'Breathe Out';
            this.circle.className = 'breathing-circle exhale';
        }
    },

    // Animation loop
    animate: function () {
        if (!this.isRunning || this.isPaused) return;

        const now = Date.now();
        const phaseElapsed = now - this.phaseStartTime;
        const sessionElapsed = now - this.sessionStartTime;

        // Update phase timer
        const remaining = Math.max(0, Math.ceil((this.phaseDuration - phaseElapsed) / 1000));
        this.phaseTimer.textContent = `${remaining}s`;

        // Update session stats
        this.elapsedTime = Math.floor(sessionElapsed / 1000);
        const minutes = Math.floor(this.elapsedTime / 60);
        const seconds = this.elapsedTime % 60;
        this.statTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        this.statCycles.textContent = this.cycleCount;

        // Animate circle
        const progress = Math.min(phaseElapsed / this.phaseDuration, 1);
        this.animateCircle(progress);

        // Check if phase complete
        if (phaseElapsed >= this.phaseDuration) {
            this.nextPhase();
        }

        // Check if session complete
        if (this.elapsedTime >= this.duration) {
            this.complete();
            return;
        }

        // Continue animation
        this.animationFrame = requestAnimationFrame(() => this.animate());
    },

    // Animate circle size
    animateCircle: function (progress) {
        let scale;

        if (this.currentPhase === 'inhale') {
            // Grow from 1.0 to 1.4
            scale = 1.0 + (progress * 0.4);
        } else if (this.currentPhase === 'exhale') {
            // Shrink from 1.4 to 1.0
            scale = 1.4 - (progress * 0.4);
        } else {
            // Hold - maintain current size
            scale = this.currentPhase === 'hold1' ? 1.4 : 1.0;
        }

        this.circle.style.transform = `scale(${scale})`;
    },

    // Move to next phase
    nextPhase: function () {
        const pattern = this.patterns[this.currentPattern];

        if (this.currentPhase === 'inhale') {
            if (pattern.hold1 > 0) {
                this.startPhase('hold1');
            } else {
                this.startPhase('exhale');
            }
        } else if (this.currentPhase === 'hold1') {
            this.startPhase('exhale');
        } else if (this.currentPhase === 'exhale') {
            if (pattern.hold2 > 0) {
                this.startPhase('hold2');
            } else {
                this.completeCycle();
            }
        } else if (this.currentPhase === 'hold2') {
            this.completeCycle();
        }
    },

    // Complete a cycle
    completeCycle: function () {
        this.cycleCount++;
        this.cycleCounter.textContent = `Cycle ${this.cycleCount} of ${this.totalCycles}`;
        this.startPhase('inhale');
    },

    // Complete session
    complete: function () {
        this.isRunning = false;

        // Cancel animation
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        // Show completion
        this.phaseText.textContent = 'Complete!';
        this.phaseTimer.textContent = '✓';
        this.circle.style.transform = 'scale(1)';
        this.circle.className = 'breathing-circle';

        // Show start button
        this.startBtn.style.display = 'flex';
        this.pauseBtn.style.display = 'none';
    }
};

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    breathingApp.init();
});
