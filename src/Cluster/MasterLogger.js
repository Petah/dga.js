MasterLogger = function () {
    this.loggables = [];
};

MasterLogger.prototype.log = function (workers) {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    for (var pid in workers) {
        for (var i = 0; i < workers[pid].length; i++) {
            var data = workers[pid][i];
            for (var desc in data) {
                if (Array.isArray(data[desc])) {
                    data[desc] = data[desc].join(', ');
                } else if (typeof data[desc] === 'object') {
                    data[desc] = JSON.stringify(data[desc], null, 4);
                }
                process.stdout.write(desc + ': ' + data[desc] + '\n');
            }
        }
    }
};

MasterLogger.prototype.addLoggable = function (loggable) {
    this.loggables.push(loggable);
    loggable.setLogger(this);
};
