const express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server);
const port = 6969

// API Routes

app.get('/', (req, res) => {
    res.sendFile('templates/client_chat.html', { root: __dirname });
})

app.get('/darkmode.css', (req, res) => {
    res.sendFile('darkmode.css', { root: __dirname });
})

app.get('/manifest.webmanifest', (req, res) => {
    res.sendFile('manifest.webmanifest', { root: __dirname });
})

// Scripts

app.get('/sw.js', (req, res) => {
    res.sendFile('sw.js', { root: __dirname });
})

app.get('/aes', (req, res) => {
    res.sendFile('scripts/aes.js', { root: __dirname })
})

app.get('/jquery', (req, res) => {
    res.sendFile('scripts/jquery.min.js')
})

// Icons

app.get('/icons/512', (req, res) => {
    res.sendFile('icons/cryptochat 512.png', { root: __dirname });
})

app.get('/icons/192', (req, res) => {
    res.sendFile('icons/cryptochat 192.png', { root: __dirname });
})

app.get('/favicon.ico', (req, res) => {
    res.sendFile('icons/favicon.ico', { root: __dirname });
})

// Audio

app.get('/notification', (req, res) => {
    res.sendFile('notification.mp3', { root: __dirname });
})


// SocketIO

io.on('connection', connection =>  {
    connection.on('chat event', data => {
        connection.emit('my response', data)
    });
});

// Server start

server.listen(port, () => {
    console.log('listening on *:' + port);
});
