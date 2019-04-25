function preload() {
  this.load.image('tiles', 'assets/my-tiles.png');
  this.load.atlas('atlas', 'https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png', 'https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json');
  this.load.tilemapTiledJSON('map', 'assets/new-new.json');
}

export default preload;
