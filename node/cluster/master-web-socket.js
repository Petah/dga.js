var processAmount = 1;
var chunkAmount = 1000;
var logger = new MasterLogger();

var task = new Task('Hello world!', 4000000000);
task.split(chunkAmount);

var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function () {
    log('Master connected to server ' + process.pid);
    socket.emit('task', task);
});

function fork() {
    var chunk = task.getChunk();
    if (chunk) {
        var worker = cluster.fork();
        worker.send({
            type: 'Chunk',
            payload: chunk,
        });
        worker.on('message', function(message) {
            log(message);
//            log[worker.process.pid] = message;
//            logger.log(log);
        });
    }
};

for (var i = 0; i < processAmount; i++) {
    fork();
}

cluster.on('exit', function (worker) {
    log('Worker ' + worker.process.pid + ' finished.');
    if (task.isAvailable()) {
        fork();
    }
});
