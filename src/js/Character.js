import global from './globalVariables'

export default class Character {
  step = 1;
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.createCharacter();
  }
  createCharacter(){
    global.ctx.fillRect(this.x, this.y, 20, 20);
  }
  forward = () => {
    this.timer('y', -1);
  }
  back = () => {
    this.timer('y', 1);
  }
  left = () => {
    this.timer('x', -1);
  }
  right = () => {
    this.timer('x', 1);
  }
  timer = (axis ,side, n = 0) => {
    if(n <= 20){
      this[axis]+=side*this.step / 2;
      setTimeout(this.timer, 0,axis, side, ++n);
    }
  };
}


