const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/src'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let players = {};

io.on('connection', (socket) => {
  players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    team: (Math.floor(Math.random() * 2) === 0) ? 'red' : 'blue'
  };

  socket.emit('currentPlayers', players);

  socket.broadcast.emit('newPlayer', players[socket.id]);

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('disconnect', socket.id);
  });

  socket.on('playerMovement', (movementData) => {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].rotation = movementData.rotation;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });
});

server.listen(5000, () => {
  console.log('Server listening port 5000');
});
