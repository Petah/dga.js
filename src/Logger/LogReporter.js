LogReporter = function (manager) {
    this.manager = manager;
    setInterval(this.update.bind(this), 1000 / 30);
};

LogReporter.prototype.update = function () {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    process.stdout.write('Total iterations: ' + this.manager.totalIterations + '\n');
    process.stdout.write('Iterations per cycle: ' + this.manager.iterationsPerCycle + '\n');
    process.stdout.write('Time per cycle: ' + this.manager.timePerCycle + '\n');
    process.stdout.write('Ideal iterations: ' + this.manager.iterationsIdeal + '\n');
    process.stdout.write('Max iterations: ' + this.manager.iterationsMax + '\n');
    process.stdout.write('Profile interval: ' + this.manager.profileInterval + '\n');
};
