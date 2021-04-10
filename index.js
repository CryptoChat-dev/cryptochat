const express = require('express')
var io = require('socket.io');
var app = express()
var server = require('http').Server(app)
var io = io(server);
const port = 6969
const http = require('http')
//var server = require('http').Server(app);


app.get('/', (req, res) => {
    res.sendFile('templates/client_chat.html', { root: __dirname });
})

app.get('/darkmode.css', (req, res) => {
    res.sendFile('darkmode.css', { root: __dirname });
})

app.get('/manifest.webmanifest', (req, res) => {
    res.sendFile('manifest.webmanifest', { root: __dirname });
})

app.get('/sw.js', (req, res) => {
    res.sendFile('sw.js', { root: __dirname });
})

app.get('/icons/512', (req, res) => {
    res.sendFile('icons/cryptochat 512.png', { root: __dirname });
})

app.get('/icons/192', (req, res) => {
    res.sendFile('icons/cryptochat 192.png', { root: __dirname });
})

app.get('/notification', (req, res) => {
    res.sendFile('notification.mp3', { root: __dirname });
})


io.on('connection', connection =>  {
    console.log('A user connected');
    connection.on('chat event', data => {
        console.log(data)
    });
});


server.listen(port, () => {
    console.log('listening on *:' + port);
  });