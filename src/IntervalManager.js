function IntervalManager(worker) {
	this.timers = [];
	this.timerIDs = [];
};

IntervalManager.prototype.startTimer = function(timer) {
	if (timer.id) {
		for (var i = 0; i < this.timerIDs.length; i++) {
			if (this.timerIDs[i] === timer.id) {
				return;
			}
		}
	}
	timer.id = setInterval(timer.callback, timer.interval);
	this.timerIDs.push(timer.id);
};

IntervalManager.prototype.startTimers = function() {
	for (var i = 0; i < this.timers.length; i++) {
		this.startTimer(this.timers[i]);
	}
};

IntervalManager.prototype.stopTimers = function() {
	for (var i = 0; i < this.timerIDs.length; i++) {
		clearInterval(this.timerIDs[i]);
	}
	this.timerIDs = [];
};

module.exports = IntervalManager;
