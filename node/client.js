require('./index');

var data = 'hello';
var generator = new R5();
var logger = new CLILogger();
//var manager = new TimedManager();
var manager = new CycleManager();
var matcher = new Matcher();

matcher.setData(data);
matcher.setGenerator(generator);
manager.setWorker(matcher);

logger.addLoggable(manager);
logger.addLoggable(matcher);

manager.start();
