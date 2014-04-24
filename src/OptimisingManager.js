var Timer = require('./Timer');

function OptimisingManager(worker) {
	this.worker = worker;
	this.timePerCycle = null;

	this.timers = [];

	this.totalIterations = 0;
    this.iterationsPerCycle = 0;
	this.iterations = 100;
	this.iterationStep = 100;
	this.iterationsMax = 1000000;
	this.profileInterval = 250;
	this.idealProfile = 1000;
	this.idealCycleTime = 50;
	this.timer = new Timer();
};

OptimisingManager.prototype.clear = function() {
};

OptimisingManager.prototype.profileOnce = function() {
	this.timer.start();
	this.cycle();
	this.lastIterations += this.iterationsPerCycle;
	this.timePerCycle = this.timer.stop();
};

OptimisingManager.prototype.profile = function() {
	this.lastIterations = 0;
	this.profileOnce();
	while (this.timePerCycle === 0) {
		this.iterations += this.iterationStep;
		this.profileOnce();
	}
	this.iterationsIdeal = Math.max(1, Math.floor(this.lastIterations / this.timePerCycle * this.profileInterval));
	this.iterations = this.iterationsIdeal;
};

OptimisingManager.prototype.cycle = function() {
	var i = Math.floor(Math.min(this.iterations, this.iterationsMax));
	this.iterationsPerCycle = i;
	while (--i) {
		this.worker.work();
	}
};

OptimisingManager.prototype.increaseIterations = function() {
	this.iterations += this.iterationStep;
};

module.exports = OptimisingManager;
