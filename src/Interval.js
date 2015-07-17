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
        this.id = null;
        clearInterval(this.id);
    }
};
