var Reporter = function(manager) {
	this.manager = manager;
	this.updateInterval = 500;
};

Reporter.prototype.start = function() {
	this.timers = [
		setInterval(this.update.bind(this), this.updateInterval),
	];
};

Reporter.prototype.update = function() {
    document.getElementById('iterations-per-cycle').innerText = this.manager.iterations
    document.getElementById('time-per-cycle').innerText = this.manager.timePerCycle;
};
