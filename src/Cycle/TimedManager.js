TimedManager = function () {
    inherit(Manager, this);

    this.idealCycleTime = 500;

    this.timers.push({
        callback: this.cycle.bind(this),
        interval: this.idealCycleTime
    });
};

TimedManager.prototype.cycle = function () {
    this.timer.start();
    this.iterationsPerCycle = 0;
    while (this.timer.current() < this.idealCycleTime) {
        this.iterationsPerCycle++;
        this.worker.work();
    }
    this.totalIterations += this.iterationsPerCycle;
    this.timePerCycle = this.timer.current();
    this.log();
    if (this.worker.isComplete()) {
        this.stop();
    }
};

TimedManager.prototype.getLogData = function () {
    return extend(Manager.prototype.getLogData.call(this), {
        'Total iterations': numeral(this.totalIterations).format('0,0'),
        'Iterations per cycle': numeral(this.iterationsPerCycle).format('0,0'),
        'Time per cycle': numeral(this.timePerCycle).format('0,0.0000'),
        'Ideal cycle time': numeral(this.idealCycleTime).format('0,0'),
        'Complete': this.worker.isComplete() ? 'Yes' : 'No',
    });
};
