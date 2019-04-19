import global from './globalVariables'
import Creature from "./Creature";

export default class Character extends Creature{
    constructor(x, y, name) {
        super();
        this.x = x;
        this.y = y;
        this.name.text = name;
    }

    create = () => {
        global.ctx.fillStyle = '#000000';
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.setCenter(this.x, this.y);
    };
}


