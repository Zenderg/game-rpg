import Creature from './Creature';
import global from './globalVariables';
import {insideCircle} from './helpers';

export default class Monster extends Creature {
  agroRange = 300;
  agro = false;

  constructor(x, y, name) {
    super();
    this.x = x;
    this.y = y;
    this.name.text = name;
    this.step = 2;
    this.setCenter(x, y);
  }

  create = () => {
    global.ctx.fillStyle = '#ff000c';
    global.ctx.fillRect(this.x, this.y, 20, 20);
    this.setCenter(this.x, this.y);
  };

  showAgroRange = () => {
    global.ctx.beginPath();
    global.ctx.strokeStyle = '#ff000c';
    global.ctx.arc(this.center.x, this.center.y, this.agroRange, 0, Math.PI * 2,
        true);
    global.ctx.stroke();
  };

  agro = (pers) => {
    if (insideCircle(this.center, this.agroRange, pers)){
      this.moveTo(pers);
      this.setCenter(this.x, this.y);
    }
  };
}
