import global from './globalVariables';

export default class Creature {
    x = 0;
    y = 0;
    step = 1;
    speed = 20;
    height = 20;
    width = 20;
    center = {
        x: this.x + this.width / 2,
        y: this.y - this.height / 2
    };
    name = {
        text:'being',
        position: {x: 0, y: 0},
        font: "12px serif",
        offsetTop: 20
    };

    up = () => {
        this.timer('y', -1);
    };
    down = () => {
        this.timer('y', 1);
    };
    left = () => {
        this.timer('x', -1);
    };
    right = () => {
        this.timer('x', 1);
    };
    setCenter = (x, y) => {
        this.center.x = x + this.width / 2;
        this.center.y = y + this.width / 2;
    };
    timer = (axis, side, n = 0) => {
        if (n <= this.speed && this.checkFieldRange(axis, side)) {
            this[axis] += side * this.step / 2;
            setTimeout(this.timer, 0, axis, side, ++n);
        }
    };

    checkFieldRange = (axis, side) => {
        const futureDistance = this[axis] + side * this.step;
        if (axis === 'x'){
            return futureDistance >= 0 && futureDistance <= global.width - this.width;
        } else if(axis === 'y'){
            return futureDistance >= 0 && futureDistance <= global.height - this.height;
        }
    };

    showName = () => {
        const nameLength = global.ctx.measureText(this.name.text).width;

        this.name.position.x = this.center.x - nameLength / 2;
        this.name.position.y = this.center.y - this.name.offsetTop;


        global.ctx.font = this.name.font;
        global.ctx.fillText(this.name.text, this.name.position.x, this.name.position.y);
    };
}
