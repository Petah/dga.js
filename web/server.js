var express = require('express');
var http = require('http');

var app = express();
app.use(express.static(__dirname));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var server = http.Server(app);
server.listen(3000, function () {
    console.log('listening on *:3000');
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('connection');
    socket.on('log', function(log) {
        io.emit('log', log);
    });
    socket.on('task', function(log) {
        io.emit('task', log);
    });
});
