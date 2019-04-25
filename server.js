const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

let players = {};

io.on('connection', (socket) => {
  console.log('user connected');
  players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id
  };

  socket.emit('currentPlayers', players);

  socket.broadcast.emit('newPlayer', players[socket.id]);

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('disconnect', socket.id);
  });

  socket.on('playerMovement', (movementData) => {
    console.log(movementData);
    // const speed = 175;
    // const prevVelocity = players[socket.id].body.velocity.clone();
    //
    // // Stop any previous movement from the last frame
    // players[socket.id].body.setVelocity(0);
    //
    // // Horizontal movement
    // if (globalVariables.cursors.left.isDown) {
    //   players[socket.id].body.setVelocityX(-speed);
    // } else if (globalVariables.cursors.right.isDown) {
    //   players[socket.id].body.setVelocityX(speed);
    // }
    //
    // // Vertical movement
    // if (globalVariables.cursors.up.isDown) {
    //   players[socket.id].body.setVelocityY(-speed);
    // } else if (globalVariables.cursors.down.isDown) {
    //   players[socket.id].body.setVelocityY(speed);
    // }
    //
    // // Normalize and scale the velocity so that
    // // players[socket.id] can't move faster along a diagonal
    // players[socket.id].body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    // if (globalVariables.cursors.left.isDown) {
    //   players[socket.id].anims.play('misa-left-walk', true);
    // } else if (globalVariables.cursors.right.isDown) {
    //   players[socket.id].anims.play('misa-right-walk', true);
    // } else if (globalVariables.cursors.up.isDown) {
    //   players[socket.id].anims.play('misa-back-walk', true);
    // } else if (globalVariables.cursors.down.isDown) {
    //   players[socket.id].anims.play('misa-front-walk', true);
    // } else {
    //   players[socket.id].anims.stop();
    //
    //   // If we were moving, pick and idle frame to use
    //   if (prevVelocity.x < 0) {
    //     players[socket.id].setTexture('atlas',
    //       'misa-left');
    //   } else if (prevVelocity.x > 0) {
    //     players[socket.id].setTexture('atlas',
    //       'misa-right');
    //   } else if (prevVelocity.y < 0) {
    //     players[socket.id].setTexture('atlas',
    //       'misa-back');
    //   } else if (prevVelocity.y > 0) {
    //     players[socket.id].setTexture('atlas',
    //       'misa-front');
    //   }
    // }
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    // players[socket.id].rotation = movementData.rotation;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });
});

server.listen(5000, () => {
  console.log('Server listening port 5000');
});
