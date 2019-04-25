import globalVariables from '../globalVariables';
import Phaser from 'phaser';

function addPlayer(self, playerInfo) {
  const map = self.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('my-tiles', 'tiles');

  map.createStaticLayer('bg', tileset, 0, 0);
  const interactivePlayer = map.createStaticLayer('interactive_player', tileset, 0, 0);

  interactivePlayer.setCollisionByProperty({ collides: true });
  interactivePlayer.setDepth(10);

  globalVariables.player = self.physics.add
    .sprite(400, 550, 'atlas', 'misa-front')
    .setOffset(0, 24)
    .setDepth(20);

  const camera = self.cameras.main;
  camera.startFollow(globalVariables.player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  self.physics.add.collider(globalVariables.player, interactivePlayer);
}

function addOtherPlayers(self, playerInfo) {
  const otherPlayer = self.physics.add
    .sprite(400, 550, 'atlas', 'misa-front')
    .setOffset(0, 24)
    .setDepth(20);
  otherPlayer.playerId = playerInfo.playerId;
  globalVariables.otherPlayers.push(otherPlayer);
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
    globalVariables.otherPlayers.map(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.body.x = playerInfo.x;
        otherPlayer.body.y = playerInfo.y;
      }
    });
  });


  // debag
  // const debugGraphics = this.add.graphics().setAlpha(0.75);
  // interactivePlayer.renderDebug(debugGraphics, {
  //   tileColor: null, // Color of non-colliding tiles
  //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
  //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  // });

  globalVariables.cursors = this.input.keyboard.createCursorKeys();

  const anims = this.anims;
  anims.create({
    key: 'misa-left-walk',
    frames: anims.generateFrameNames('atlas', {
      prefix: 'misa-left-walk.', start: 0, end: 3, zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: 'misa-right-walk',
    frames: anims.generateFrameNames('atlas', {
      prefix: 'misa-right-walk.', start: 0, end: 3, zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: 'misa-front-walk',
    frames: anims.generateFrameNames('atlas', {
      prefix: 'misa-front-walk.', start: 0, end: 3, zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: 'misa-back-walk',
    frames: anims.generateFrameNames('atlas', {
      prefix: 'misa-back-walk.', start: 0, end: 3, zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
}


export default create;
