IntervalManager = function (worker) {
    this.timers = [];
    this.timerInstances = [];
};

IntervalManager.prototype.startTimer = function (timer) {
    if (timer.instance) {
        if (!timer.instance.isRunning()) {
            timer.instance.start();
        }
        return;
    }
    timer.instance = new Interval(timer.callback, timer.interval);
    this.timerInstances.push(timer.instance);
};

IntervalManager.prototype.startTimers = function () {
    for (var i = 0; i < this.timers.length; i++) {
        this.startTimer(this.timers[i]);
    }
};

IntervalManager.prototype.stopTimers = function () {
    for (var i = 0; i < this.timerInstances.length; i++) {
        this.timerInstances[i].stop();
    }
};
