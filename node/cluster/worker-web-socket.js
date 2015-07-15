var os = require('os');

var data = 'hello';
//var manager = new TimedManager();
var manager = new CycleManager();
var worker = new Matcher(Seed.int());

//var generators = [R2, R4, R5];
var generators = [R5];
var generator = new generators[generators.length * Math.random() << 0]();

var name = os.hostname() + ':' + generator.name + ':' + process.pid;

var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function () {
    console.log(name + ' connected to server ' + process.pid);
});

var logger = new WebSocketLogger(name, socket);

worker.setData(data);
worker.setGenerator(generator);
manager.setWorker(worker);

logger.addLoggable(manager);
logger.addLoggable(worker);

manager.start();