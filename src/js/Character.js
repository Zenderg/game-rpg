import global from './globalVariables'
import Being from "./Being";

export default class Character extends Being{
    constructor(x, y, name) {
        super();
        this.x = x;
        this.y = y;
        this.name.text = name;
    }

    create = () => {
        global.ctx.fillStyle = '#000000';
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
}


