import Being from "./Being";
import global from "./globalVariables";

export default class Monster extends Being{
    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
    }
    create = () => {
        global.ctx.fillStyle = '#ff000c';
        global.ctx.fillRect(this.x, this.y, 20, 20);
    }
}
