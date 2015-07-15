Manager = function(worker) {
    inherit(IntervalManager, this);
    inherit(Loggable, this);

    this.worker = worker;
    this.timePerCycle = null;
    this.timers.push({
        callback: this.timeIterationsPerSecond.bind(this),
        interval: 1000
    });

    this.totalIterations = 0;
    this.iterationsPerCycle = 0;
    this.iterationsPerSecond = [];
    this.iterationsLastSecond = 0;
    this.timer = new Timer();
}

Manager.prototype.start = function () {
    this.startTimers();
    this.startTime = new Date();
};

Manager.prototype.stop = function () {
    this.stopTimers();
    this.iterationsPerCycle = 0;
};

Manager.prototype.cycle = function () {
    throw new Error('Subclass must implement cycle');
};

Manager.prototype.timeIterationsPerSecond = function () {
    this.iterationsPerSecond.push(this.totalIterations - this.iterationsLastSecond);
    if (this.iterationsPerSecond.length > 5) {
        this.iterationsPerSecond.shift();
    }
    this.iterationsLastSecond = this.totalIterations;
};

Manager.prototype.getWorker = function () {
    return this.worker;
};

Manager.prototype.setWorker = function (worker) {
    this.worker = worker;
    return this;
};

Manager.prototype.getLogData = function () {
    return {
        'Iterations per second': this.iterationsPerSecond,
        'Average iterations per second': numeral(ss.average(this.iterationsPerSecond)).format('0,0'),
        'Run time': this.startTime ? new Duration(this.startTime, new Date()).toString(1) : 'N/A',
    };
};
