ClusterLogger = function () {
    this.loggables = [];
};

ClusterLogger.prototype.log = function () {
    var data = [];
    for (var i = 0; i < this.loggables.length; i++) {
        data.push(this.loggables[i].getLogData());
    }
    process.send(data);
};

ClusterLogger.prototype.addLoggable = function (loggable) {
    this.loggables.push(loggable);
    loggable.setLogger(this);
};
