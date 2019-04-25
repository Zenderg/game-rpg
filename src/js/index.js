import phaser from 'phaser';
import preload from './scene/preload';
import create from './scene/create';
import update from './scene/update';
import globalVariables from './globalVariables';

window.onload = () => {
  globalVariables.config = {
    type: phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#0d0d0d',
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 }, // Top down game, so no gravity
        debug:true
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  globalVariables.game = new phaser.Game(globalVariables.config);
  console.log('Starting ...');
};
