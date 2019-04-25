import globalVariables from '../globalVariables';
import Phaser from 'phaser';

function addPlayer(self, playerInfo) {
  console.log(playerInfo);
  globalVariables.player = self.physics.add
    .sprite(400, 550, 'atlas', 'misa-front')
    .setOffset(0, 24)
    .setDepth(20);
}

function addOtherPlayers(self, playerInfo) {
  console.log('!!!!!!!!!!!');
  console.log(playerInfo);
  const otherPlayer = self.physics.add
    .sprite(400, 550, 'atlas', 'misa-front')
    .setOffset(0, 24)
    .setDepth(20);
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
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
    console.log(4444444444);
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setRotation(playerInfo.rotation);
        otherPlayer.setPosition(playerInfo.x, playerInfo.y);
      }
    });
  });


  globalVariables.player = this.physics.add
    .sprite(400, 550, 'atlas', 'misa-front')
    .setOffset(0, 24)
    .setDepth(20);
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('my-tiles', 'tiles');

  map.createStaticLayer('bg', tileset, 0, 0);
  const interactivePlayer = map.createStaticLayer('interactive_player', tileset, 0, 0);

  interactivePlayer.setCollisionByProperty({ collides: true });
  interactivePlayer.setDepth(10);

  // debag
  const debugGraphics = this.add.graphics().setAlpha(0.75);
  interactivePlayer.renderDebug(debugGraphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  });

  globalVariables.cursors = this.input.keyboard.createCursorKeys();
  globalVariables.controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: this.cameras.cameras[0],
    left: globalVariables.cursors.left,
    right: globalVariables.cursors.right,
    up: globalVariables.cursors.up,
    down: globalVariables.cursors.down,
    speed: 0.5
  });

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

  this.physics.add.collider(globalVariables.player, interactivePlayer);

  const camera = this.cameras.main;
  camera.startFollow(globalVariables.player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}


export default create;
