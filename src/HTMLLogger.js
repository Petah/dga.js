HTMLLogger = function () {
    this.loggables = [];
    this.node = null;
};

HTMLLogger.prototype.log = function () {
    this.node.innerHTML = '';
    for (var i = 0; i < this.loggables.length; i++) {
        var data = this.loggables[i].getLogData();
        for (var desc in data) {
            var node = document.createElement('pre');
            node.innerText = desc + ': ' + data[desc];
            this.node.appendChild(node);
        }
    }
};

HTMLLogger.prototype.addLoggable = function (loggable) {
    this.loggables.push(loggable);
    loggable.setLogger(this);
};

HTMLLogger.prototype.setNode = function (node) {
    this.node = node;
    return this;
};

HTMLLogger.prototype.getNode = function () {
    return this.node;
}
