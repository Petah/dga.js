CycleManager = function () {
    inherit(Manager, this);

    this.cycles = 100000;

    this.timers.push({
        callback: this.cycle.bind(this),
        interval: this.idealCycleTime
    });
};

CycleManager.prototype.cycle = function () {
    this.timer.start();
    this.iterationsPerCycle = 0;
    var i = this.cycles;
    while (--i) {
        this.worker.work();
    }
    this.totalIterations += this.cycles;
    this.timePerCycle = this.timer.current();
    this.log();
    if (this.worker.complete) {
        this.stop();
    }
};

CycleManager.prototype.getLogData = function () {
    return extend(Manager.prototype.getLogData.call(this), {
        'Total iterations': numeral(this.totalIterations).format('0,0'),
        'Time per cycle': numeral(this.timePerCycle).format('0,0.0000'),
        'Complete': this.worker.complete ? 'Yes' : 'No',
    });
};
