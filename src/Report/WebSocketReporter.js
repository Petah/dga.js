WebSocketReporter = function (name, socket) {
    this.name = name;
    this.socket = socket;
    this.reportables = [];
};

WebSocketReporter.prototype.report = function (object) {
    console.log(object.$className);
};
