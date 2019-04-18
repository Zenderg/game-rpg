import global from "./globalVariables";
import Being from "./Being";

export default class NPC extends Being {
    canMove = true;

    constructor(x, y) {
        super();
        this.step = 0.3;
        this.speed = 340;
        this.x = x;
        this.y = y;
    }

    create = () => {
        global.ctx.fillStyle = '#07ff11';
        global.ctx.fillRect(this.x, this.y, 20, 20);
    };
    move = () => {
        if (this.canMove) {
            this.actionMove(Math.random() * 4 | 0);
        }
    };
    actionMove = (direction) => {
        switch (direction) {
            case 0:
                this.up();
                break;
            case 1:
                this.left();
                break;
            case 2:
                this.down();
                break;
            case 3:
                this.right();
                break;
            default:
                throw 'Неизвестное направление';
        }
        this.lockMove();
    };
    lockMove(){
        this.canMove=false;
        setTimeout(() => this.canMove = true, 10000);
    }
}
