Eventable = function () {
    this.events = {};
};

Eventable.prototype.on = function (name, callback) {
    if (!this.events[name]) {
        this.events[name] = [];
    }
    this.events[name].push(callback);
};

Eventable.prototype.trigger = function (name, arguments) {
    if (this.events[name]) {
        this.events[name].forEach(function(callback) {
            callback.apply(this, arguments);
        });
    }
};
