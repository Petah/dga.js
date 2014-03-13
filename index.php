<?php
ini_set('memory_limit', '500m');

class Encoder {

    public $size = 64;
    public $chunk = 0;

    public function read() {
        $fp = fopen(__DIR__ . '/enwik8.zip', 'r');
        fseek($fp, $this->chunk * $this->size);
        $data = fread($fp, $this->size);   // read 8 bytes from byte 7
        fclose($fp);
        return $data;
    }

    public function base64() {
        return base64_encode($this->read());
    }

}
$encoder = new Encoder();
$encoder->size = 64;
?>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="highcharts.js"></script>
<script>
var data = <?= json_encode($encoder->base64()); ?>
</script>

Best find: <span id="best-find">N/A</span><br/>
Time: <span id="time">N/A</span><br/>
Seed: <span id="seed">N/A</span><br/>
Current: <span id="current">N/A</span><br/>

<script>
function Generator() {
};

Generator.prototype.intToByte = function(value) {
    return value % 256;
};
Generator.prototype.floatToByte = function(value) {
    return this.intToByte(value.toString().replace(/0?\./, ''));
};

function R1() {
    this.name = 'R1';
};

R1.prototype = Object.create(Generator.prototype);

R1.prototype.current = function() {
    var x = Math.sin(this.seed) * 10000;
    return this.floatToByte(x - Math.floor(x));
};

R1.prototype.next = function() {
    var result = this.current();
    this.seed++;
    return result;
};

function R2() {
    this.name = 'R2';
    this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/';
};

R2.prototype = Object.create(R1.prototype);

R2.prototype.current = function() {
    return this.chars.charCodeAt(R1.prototype.current.apply(this, arguments) % 64);
};

function Matcher(data, generator, seed) {
    this.data = data;
    this.generator = generator;
    this.seed = seed;
    this.bestFind = localStorage.getItem('bestFind') || null;
};

Matcher.prototype.trace = function(i, next) {
    var length = 0;
    while (next == this.data.charCodeAt(i)) {
        length++;
        next = this.generator.next();
    }
    if (this.bestFind === null || this.bestFind[1] < length) {
        this.bestFind = [i, length, this.seed, this.generator.name];
        localStorage.setItem('bestFind', this.bestFind);
    }
};

Matcher.prototype.run = function() {
    this.generator.seed = this.seed;
    var next = this.generator.next();
    for (var i = 0; i < this.data.length; i++) {
        if (next === this.data.charCodeAt(i)) {
            this.trace(i, next);
        }
    }

    this.seed++;
};

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

var seed = localStorage.getItem('seed') || 1,
    dga = new Reporter (new Matcher(data, new R2(), seed));
dga.run();
</script>

<button onclick="clearTimeout(dga.timer);">Stop</button>
<button onclick="clearTimeout(dga.timer);localStorage.clear();location.reload()">Clear</button>


<div id="chart"></div>
<script>
    /*
    jQuery(function($) {
        var categories = [],
            chartData = [];
        for (var i = 0; i < 256; i++) {
            categories.push(i);
            chartData.push(0);
        }
        for (var i = 0; i < data.length; i++) {
            chartData[data.charCodeAt(i)]++;
        }
        $('#chart').highcharts({
            chart: {
                type: 'column',
                events: {
                    load: function() {
                        var series = this.series[0];
                        setInterval(function() {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            xAxis: {
                categories: categories,
                labels: {
                    rotation: -90,
                    align: 'right',
                    style: {
                        fontSize: '6px'
                    }
                }
            },
            series: [{
                name: 'Data',
                data: chartData
            }]
        });
    });
    */
</script>