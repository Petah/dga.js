IntervalManager = function (worker) {
    this.timers = [];
    this.timerInstances = [];
};

IntervalManager.prototype.addTimer = function (name, callback, interval) {
    this.timers.push({
        name: name,
        callback: callback.bind(this),
        interval: interval,
    });
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
//    log('Starting timers.')
    for (var i = 0; i < this.timers.length; i++) {
        this.startTimer(this.timers[i]);
    }
};

IntervalManager.prototype.stopTimers = function () {
//    log('Stopping timers.')
    for (var i = 0; i < this.timers.length; i++) {
        if (this.timers[i].instance) {
            this.timers[i].instance.stop();
        }
    }
};
