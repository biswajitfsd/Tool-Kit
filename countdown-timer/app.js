var timer = {
    intervalId: null,
    remainingTime: 0,
    isPaused: false,

    start: function(time) {
        this.remainingTime = ((parseInt(time, 10) * 60) + 2) * 1000;
        
        if (this.intervalId !== null) {
            this.clear();
        }
        
        var tick = function() {
            if (!this.isPaused && this.remainingTime > 0) {
                this.remainingTime -= 1000;
                var minutes = Math.floor(this.remainingTime / (1000 * 60));
                var seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
                
                document.getElementById("timer").innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else if (this.remainingTime <= 0) {
                document.getElementById("timer").innerHTML = "TIME UP";
                this.clear();
            }
        };
        
        tick = tick.bind(this);
        this.intervalId = setInterval(tick, 1000);
    },

    pause: function() {
        this.isPaused = true;
    },

    resume: function() {
        this.isPaused = false;
    },

    clear: function() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
};