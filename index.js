var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

console.log("server started");

app.get("/", function(req, res){
    res.sendFile(__dirname +"/home.html");
});

io.sockets.on('connection', function(socket) {
    console.log("connected");

    socket.on('new message', function(json) {
        console.log(json);

        io.sockets.emit('onNewMessage', json);
    });

    socket.on('remove message', function(json) {
        console.log(json);

        io.sockets.emit('onRemoveMessage', json);
    });

    socket.on('seen message', function(json) {
        console.log(json);

        io.sockets.emit('onSeenMessage', json);
    });

    socket.on('add member', function(json) {
        io.sockets.emit('onAddMember', json);
    });

    socket.on('delete member', function(json) {
        console.log(json);

        io.sockets.emit('onDeleteMember', json);
    });

    socket.on('update online', function(json) {
        console.log(json);

        io.sockets.emit('onUpdateOnline', json);
    });

});
