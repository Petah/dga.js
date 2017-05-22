require('./index');

var chunk = null;
var generator = new R3();
var manager = new CycleManager();
var worker = new Matcher();
worker.setGenerator(generator);
manager.setWorker(worker);
manager.on('complete', function() {
    log('Completed chunk.');
    chunk = null;
    socket.emit('get-chunk');
});

var socket = require('socket.io-client')(socketHost);
socket.on('connect', function () {
    log('Connected to server ' + socketHost);
    socket.emit('get-chunk');
});

var logger = new WebSocketLogger(process.pid, socket);
logger.addLoggable(manager);
logger.addLoggable(worker);

var reporter = new WebSocketReporter(process.pid, socket);
manager.setReporter(reporter);

socket.on('tasks', function() {
    log('New tasks registered.');
    if (!chunk) {
        socket.emit('get-chunk');
    }
});

socket.on('chunk', function(newChunk) {
    if (chunk) {
        return;
    }
    log('Received chunk.');
    chunk = newChunk;
    worker.setChunk(chunk);
    manager.start();
});
