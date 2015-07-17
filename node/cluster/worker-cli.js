var data = 'hello';
var generator = new R3();
var logger = new ClusterLogger();
//var manager = new TimedManager();
var manager = new CycleManager();
var worker = new Matcher();

logger.addLoggable(manager);
logger.addLoggable(worker);

process.on('message', function(data) {
    console.log(data);
    data.payload.__proto__ = global[data.type].prototype;

    worker.setChunk(data.payload);
    worker.setGenerator(generator);

    manager.setWorker(worker);
    manager.on('complete', function() {
        process.exit(0);
    })
    manager.start();
});
