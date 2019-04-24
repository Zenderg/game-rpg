function preload() {
  this.load.image('bg', 'assets/image1.jpg');
  this.load.image('platform', 'assets/platform.png');
  this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 45 });
}

export default preload;
