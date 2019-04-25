import globalVariables from '../globalVariables';
function update() {
  if (globalVariables.cursors.left.isDown) {
    globalVariables.player.setVelocityX(-160);
    globalVariables.player.anims.play('left', true);
  } else if (globalVariables.cursors.right.isDown) {
    globalVariables.player.setVelocityX(160);
    globalVariables.player.anims.play('right', true);
  } else {
    globalVariables.player.setVelocityX(0);
    globalVariables.player.anims.play('turn');
  }
  if (globalVariables.cursors.up.isDown) {
    globalVariables.player.body.moveUp(430);
  } else if (globalVariables.cursors.down.isDown) {
    globalVariables.player.body.moveDown(430);
  }
}

export default update;
