function Manager() {
	this.generator = null;
	this.matcher = null;
	this.reporter = null;
	this.timePerCycle = null;

	this.timers = [];

	this.iterations = 100000;
	this.iterationStep = 100000;
	this.interval = 1000;
	this.profileInterval = 1000;
	this.idealProfile = 1000;
};

Manager.prototype.start = function() {
	this.stop();
	this.timers = [
		//setInterval(this.cycle.bind(this), this.interval),
		setInterval(this.profile.bind(this), this.profileInterval),
	];
};

Manager.prototype.stop = function() {
	for (var i = 0; i < this.timers.length; i++) {
		clearTimeout(this.timers[i]);
	}
	this.timers = [];
};

Manager.prototype.clear = function() {
};

Manager.prototype.profile = function() {
	var now = new Date().getTime();
	this.cycle();
	this.timePerCycle = new Date().getTime() - now;
	if (this.timePerCycle < this.idealProfile) {
		this.increaseIterations();
	}
};
		
Manager.prototype.cycle = function() {
	var i = this.iterations;
	while (--i) {
		this.work();
	}
};

Manager.prototype.work = function() {
    var x = Math.sin(Math.random()) * 10000;
    y = x - Math.floor(x);
};

Manager.prototype.increaseIterations = function() {
	this.iterations += this.iterationStep;
};
