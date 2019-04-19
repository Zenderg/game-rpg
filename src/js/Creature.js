import global from './globalVariables';

export default class Creature {
  x = 0;
  y = 0;
  step = 0.5;
  speed = 20;
  height = 20;
  width = 20;
  limitCome = this.width + 20;
  center = {
    x: this.x + this.width / 2,
    y: this.y - this.height / 2,
  };
  name = {
    text: 'being',
    position: {x: 0, y: 0},
    font: '12px serif',
    offsetTop: 20,
  };

  up = () => {
    this.movementTimer('y', -1);
  };
  down = () => {
    this.movementTimer('y', 1);
  };
  left = () => {
    this.movementTimer('x', -1);
  };
  right = () => {
    this.movementTimer('x', 1);
  };
  setCenter = (x, y) => {
    this.center.x = x + this.width / 2;
    this.center.y = y + this.width / 2;
  };

  moveTo = (pers) => {
    const lengthLine = Math.sqrt(
        (pers.center.x - this.x) ** 2 + (pers.center.y - this.y) ** 2);
    if (lengthLine > this.limitCome) {
      const vectorX = this.center.x - pers.center.x;
      const vectorY = this.center.y - pers.center.y;
      if(-vectorX < 1 || -vectorY < 1) {
        console.log(this.center.x, pers.center.x);
        console.log(this.center.y, pers.center.y);
      }
      // console.log(-vectorX, -vectorY);
//       console.log(Math.abs(-vectorX/this.step)|0, Math.abs(-vectorY/this.step)|0)
// console.log(-vectorX/(Math.abs(-vectorX/this.step)|0), -vectorY/(Math.abs(-vectorY/this.step)|0));
      if (vectorX !== 0) this.x +=-vectorX/(Math.abs(-vectorX/this.step)|0);
      if (vectorY !== 0) this.y +=-vectorY/(Math.abs(-vectorY/this.step)|0);
    }
  };

  movementTimer = (axis, side, n = 0) => {
    if (n <= this.speed && this.checkFieldRange(axis, side)) {
      this[axis] += side * this.step;
      setTimeout(this.movementTimer, 0, axis, side, ++n);
    }
  };

  checkFieldRange = (axis, side) => {
    const futureDistance = this[axis] + side * this.step;
    if (axis === 'x') {
      return futureDistance >= 0 && futureDistance <= global.width - this.width;
    } else if (axis === 'y') {
      return futureDistance >= 0 && futureDistance <= global.height -
          this.height;
    }
  };

  showName = () => {
    const nameLength = global.ctx.measureText(this.name.text).width;

    this.name.position.x = this.center.x - nameLength / 2;
    this.name.position.y = this.center.y - this.name.offsetTop;

    global.ctx.font = this.name.font;
    global.ctx.fillText(this.name.text, this.name.position.x,
        this.name.position.y);
  };
}
