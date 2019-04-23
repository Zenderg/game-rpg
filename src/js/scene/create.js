import globalVariables from '../globalVariables';

function create() {
  this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'bg');
  globalVariables.player = this.physics.add.sprite(100, 450, 'dude');

  globalVariables.player.setCollideWorldBounds(true);
  // this.world.setBounds(0, 0, 1920, 1920);
  const platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'platform').setScale(2).refreshBody();
  platforms.create(600, 400, 'platform');
  platforms.create(50, 250, 'platform');

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

  globalVariables.cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(platforms);

  console.log('Function create ready!');
}

export default create;
