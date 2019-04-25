const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 45 });
}

function create() {
  let self = this;
  this.socket = io();
  this.otherPlayers = this.physics.add.group();
  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id]);
      } else {
        addOtherPlayers(self, players[id]);
      }
    });
  });
  this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
  });
  this.socket.on('disconnect', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
      }
    });
  });
  this.socket.on('playerMoved', function (playerInfo) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setRotation(playerInfo.rotation);
        otherPlayer.setPosition(playerInfo.x, playerInfo.y);
      }
    });
  });
  this.cursors = this.input.keyboard.createCursorKeys();
}

function addPlayer(self, playerInfo) {
  self.dude = self.physics.add.image(playerInfo.x, playerInfo.y, 'dude').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  self.dude.setDrag(100);
  self.dude.setAngularDrag(100);
  self.dude.setMaxVelocity(200);
}

function addOtherPlayers(self, playerInfo) {
  const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'dude').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
}

function update() {
  if (this.dude) {
    if (this.cursors.left.isDown) {
      this.dude.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
      this.dude.setVelocityX(150);
    } else {
      this.dude.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.dude.rotation + 1.5, 100, this.dude.body.acceleration);
    } else {
      this.dude.setAcceleration(0);
    }

    this.physics.world.wrap(this.dude, 5);

    // emit player movement
    const x = this.dude.x;
    const y = this.dude.y;
    const r = this.dude.rotation;
    if (this.dude.oldPosition
      && (x !== this.dude.oldPosition.x
        || y !== this.dude.oldPosition.y
        || r !== this.dude.oldPosition.rotation)) {
      this.socket.emit('playerMovement', { x: this.dude.x, y: this.dude.y, rotation: this.dude.rotation });
    }
    // save old position data
    this.dude.oldPosition = {
      x: this.dude.x,
      y: this.dude.y,
      rotation: this.dude.rotation
    };
  }
}
