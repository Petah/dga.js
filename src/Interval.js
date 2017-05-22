Interval = function(callback, time) {
    this.callback = callback;
    this.time = time;
    this.start();
};

Interval.prototype.start = function() {
    if (!this.id) {
        this.id = setInterval(this.callback, this.time);
    }
};

Interval.prototype.stop = function() {
    if (this.id) {
        clearInterval(this.id);
        this.id = null;
    }
};

Interval.prototype.isRunning = function() {
    if (this.id) {
        return true;
    }
    return false;
};
