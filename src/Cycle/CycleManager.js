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
    try {
        while (--i) {
            this.worker.work();
        }
    } catch (exception) {
        if (!(exception instanceof CompleteException)) {
            throw exception;
        }
    }
    this.totalIterations += this.cycles;
    this.timePerCycle = this.timer.current();
    this.log();
    if (this.worker.isComplete()) {
        this.stop();
    }
};

CycleManager.prototype.getLogData = function () {
    return extend(Manager.prototype.getLogData.call(this), {
        'Total iterations': numeral(this.totalIterations).format('0,0'),
        'Time per cycle': numeral(this.timePerCycle).format('0,0.0000'),
        'Complete': this.worker.isComplete() ? 'Yes' : 'No',
    });
};
