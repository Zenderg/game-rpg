const Phaser = require('phaser');

let anim;
let cursors;
let player;
function preload() {
  this.load.image('bg', 'images/image1.jpg');
  this.load.image('platform', 'images/platform.png');
  this.load.spritesheet('dude', 'images/dude.png', { frameWidth: 32, frameHeight: 45 });
}

function create() {
  this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'bg');
  player = this.physics.add.sprite(100, 450, 'dude');

  player.setCollideWorldBounds(true);
  const platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'platform').setScale(2).refreshBody();
  platforms.create(600, 400, 'platform');
  platforms.create(50, 250, 'platform');

  player.anims.load('walk');

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  const config = {
    key: 'walk',
    frames: this.anims.generateFrameNumbers('dude'),
    frameRate: 12,
    yoyo: false,
    repeat: -1
  };

  anim = this.anims.create(config);

  // this.input.keyboard.on('keydown_A', function (event) {
  //   console.log(player);
  //   player.anims.play('left');
  //   player.setVelocityX(-100);
  // });
  //
  // this.input.keyboard.on('keydown_D', function (event) {
  //   console.log(player);
  //   player.anims.play('right');
  //   player.setVelocityX(100);
  // });
  //
  // this.input.keyboard.on('keydown_R', function (event) {
  //   player.anims.restart();
  // });

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player, platforms);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-130);
  }
}


window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 100 },
        debug: true
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  const game = new Phaser.Game(config);
  console.log('Starting ...');
};
