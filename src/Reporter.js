var Reporter = function(matcher) {
    this.matcher = matcher;
    this.times = [];
    this.time = document.getElementById('time');
    this.bestFind = document.getElementById('best-find');
    this.seed = document.getElementById('seed');
    this.current = document.getElementById('current');
};

Reporter.prototype.run = function() {
    this.timer = setInterval(this.next.bind(this), 0);
    setInterval(this.update.bind(this), 1000);
};

Reporter.prototype.next = function() {
    var time = performance.now();
    this.matcher.run();
    this.times.push(performance.now() - time);
    this.bestFind.innerText = this.matcher.bestFind;
};

Reporter.prototype.update = function() {
    var sum = this.times.reduce(function(a, b) {
            return a + b
        }),
        avg = sum / this.times.length;
    this.times = [];

    localStorage.setItem('seed', this.matcher.seed);

    this.seed.innerText = this.matcher.seed;
    this.time.innerText = sum + '/' + avg;
    this.current.innerText = this.matcher.generator.current();
};
