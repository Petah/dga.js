var processAmount = 1;
var chunkAmount = 10;
var log = {};
var logger = new MasterLogger();

var task = new Task('Hello world!', 10000000);
task.split(chunkAmount);

function fork() {
    var chunk = task.getChunk();
    if (chunk) {
        var worker = cluster.fork();
        worker.send({
            type: 'Chunk',
            payload: chunk,
        });
        worker.on('message', function(message) {
            log[worker.process.pid] = message;
            logger.log(log);
        });
    }
};

//function bindWorker(worker) {
//    worker.on('message', function(message) {
//        log[worker.process.pid] = message;
//        logger.log(log);
//    });
//}

for (var i = 0; i < processAmount; i++) {
    fork();
}

cluster.on('exit', function (worker) {
    if (task.isAvailable()) {
        fork();
    }
});
