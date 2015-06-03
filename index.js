// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  socket.on('checked new item', function (data) {
    socket.emit('checked new item', data);
    socket.broadcast.emit('checked new item', data);
  });
  socket.on('unchecked new item', function (data) {
    socket.emit('unchecked new item', data);
    socket.broadcast.emit('unchecked new item', data);
  });
  socket.on('start meeting', function (data) {
    socket.emit('start meeting', data);
    socket.broadcast.emit('start meeting', data);
  });
});
