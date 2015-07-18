var generator = new R3();
var manager = new CycleManager();
var worker = new Matcher();


var name = os.hostname() + ':' + generator.name + ':' + process.pid;

var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function () {
    log(name + ' connected to server ' + process.pid);
});

var logger = new WebSocketLogger(name, socket);

logger.addLoggable(manager);
logger.addLoggable(worker);

process.on('message', function(data) {
    data.payload.__proto__ = global[data.type].prototype;

    worker.setChunk(data.payload);
    worker.setGenerator(generator);

    manager.setWorker(worker);
    manager.on('complete', function() {
        process.exit(0);
    })
    manager.start();
});
