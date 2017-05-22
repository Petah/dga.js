Reportable = function () {
    this.reporter = null;
};

Reportable.prototype.report = function () {
    var reporter = this.getReporter();
    if (!reporter) {
        return;
    }
    reporter.report(this);
};

Reportable.prototype.getReporter = function () {
    return this.reporter;
};

Reportable.prototype.setReporter = function (reporter) {
    this.reporter = reporter;
    return this;
};
