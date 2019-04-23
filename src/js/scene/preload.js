function preload() {
  this.load.image('bg', 'images/image1.jpg');
  this.load.image('platform', 'images/platform.png');
  this.load.spritesheet('dude', 'images/dude.png', { frameWidth: 32, frameHeight: 45 });

  console.log('Function preload ready!');
}

export default preload;
