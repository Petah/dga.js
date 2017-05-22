Manager = function(worker) {
    inherit(IntervalManager, this);
    inherit(Eventable, this);
    inherit(Loggable, this);
    inherit(Reportable, this);
    inherit(Serializable, this, ['Manager']);

    this.worker = worker;
    this.timePerCycle = null;
    this.addTimer('Manager.timeIterationsPerSecond', this.timeIterationsPerSecond, 1000);

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
    this.trigger('complete');
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
