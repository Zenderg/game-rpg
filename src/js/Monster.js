import Creature from "./Creature";
import global from "./globalVariables";

export default class Monster extends Creature{
    constructor(x, y, name){
        super();
        this.x = x;
        this.y = y;
        this.name.text = name;
        this.setCenter(x, y);
    }

    create = () => {
        global.ctx.fillStyle = '#ff000c';
        global.ctx.fillRect(this.x, this.y, 20, 20);
        this.setCenter(this.x, this.y);
    };

    showAgroRange = () => {
        global.ctx.beginPath();
        global.ctx.arc(this.center.x,this.center.y,50,0,Math.PI*2,true);
        global.ctx.stroke();
}
}
