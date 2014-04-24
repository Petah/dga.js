var Loggable = function() {
	this.logger = null;
};

Loggable.prototype.log = function() {
	var logger = this.getLogger();
	if (!logger) {
		return;
	}
	logger.log();
};

Loggable.prototype.getLogger = function() {
	return this.logger;
};

Loggable.prototype.setLogger = function(logger) {
	this.logger = logger;
	return this;
};

Loggable.prototype.getLogData = function() {
	throw new Error('Subclass must implement getLogData');
};

module.exports = Loggable;
