import Being from "./Being";
import global from "./globalVariables";

export default class Monster extends Being{
    constructor(x, y, name){
        super();
        this.x = x;
        this.y = y;
        this.name.text = name;
    }
    create = () => {
        global.ctx.fillStyle = '#ff000c';
        global.ctx.fillRect(this.x, this.y, 20, 20);
    }
}
