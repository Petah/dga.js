WebSocketLogger = function (name, socket) {
    this.name = name;
    this.socket = socket;
    this.loggables = [];
};

WebSocketLogger.prototype.log = function () {
    var data = [];
    for (var i = 0; i < this.loggables.length; i++) {
        data.push(this.loggables[i].getLogData());
    }
    this.socket.emit('log', {
        name: this.name,
        log: data,
    });
};

WebSocketLogger.prototype.addLoggable = function (loggable) {
    this.loggables.push(loggable);
    loggable.setLogger(this);
};
