var DGA = require('./index');

var data = 'hello';
var generator = new DGA.R2();
var logger = new DGA.CLILogger();
var manager = new DGA.TimedManager();
var worker = new DGA.Matcher();

worker.setData(data);
worker.setGenerator(generator);
manager.setWorker(worker);

logger.addLoggable(manager);
logger.addLoggable(worker);

manager.start();
