var data = 'hello';
var generator = new R3();
var logger = new ClusterLogger();
//var manager = new TimedManager();
var manager = new CycleManager();
var worker = new Matcher();

worker.setData(data);
worker.setGenerator(generator);
manager.setWorker(worker);

logger.addLoggable(manager);
logger.addLoggable(worker);

manager.start();
