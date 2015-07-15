CLILogger = function () {
    this.loggables = [];
};

CLILogger.prototype.log = function () {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    for (var i = 0; i < this.loggables.length; i++) {
        var data = this.loggables[i].getLogData();
        for (var desc in data) {
            process.stdout.write(desc + ': ' + data[desc] + '\n');
        }
    }
};

CLILogger.prototype.addLoggable = function (loggable) {
    this.loggables.push(loggable);
    loggable.setLogger(this);
};
