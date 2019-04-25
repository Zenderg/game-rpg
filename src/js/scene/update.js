import globalVariables from '../globalVariables';
function update() {
  const speed = 175;
  const prevVelocity = globalVariables.player.body.velocity.clone();

  // Stop any previous movement from the last frame
  globalVariables.player.body.setVelocity(0);

  // Horizontal movement
  if (globalVariables.cursors.left.isDown) {
    globalVariables.player.body.setVelocityX(-speed);
  } else if (globalVariables.cursors.right.isDown) {
    globalVariables.player.body.setVelocityX(speed);
  }

  // Vertical movement
  if (globalVariables.cursors.up.isDown) {
    globalVariables.player.body.setVelocityY(-speed);
  } else if (globalVariables.cursors.down.isDown) {
    globalVariables.player.body.setVelocityY(speed);
  }

  // Normalize and scale the velocity so that
  // globalVariables.player can't move faster along a diagonal
  globalVariables.player.body.velocity.normalize().scale(speed);

  // Update the animation last and give left/right animations precedence over up/down animations
  if (globalVariables.cursors.left.isDown) {
    globalVariables.player.anims.play('misa-left-walk', true);
  } else if (globalVariables.cursors.right.isDown) {
    globalVariables.player.anims.play('misa-right-walk', true);
  } else if (globalVariables.cursors.up.isDown) {
    globalVariables.player.anims.play('misa-back-walk', true);
  } else if (globalVariables.cursors.down.isDown) {
    globalVariables.player.anims.play('misa-front-walk', true);
  } else {
    globalVariables.player.anims.stop();

    // If we were moving, pick and idle frame to use
    if (prevVelocity.x < 0) globalVariables.player.setTexture('atlas', 'misa-left');
    else if (prevVelocity.x > 0) globalVariables.player.setTexture('atlas', 'misa-right');
    else if (prevVelocity.y < 0) globalVariables.player.setTexture('atlas', 'misa-back');
    else if (prevVelocity.y > 0) globalVariables.player.setTexture('atlas', 'misa-front');
  }
}

export default update;
