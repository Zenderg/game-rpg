export default class Being {
    x = 0;
    y = 0;
    step = 1;
    speed = 20;
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
    timer = (axis, side, n = 0) => {
        if (n <= this.speed) {
            this[axis] += side * this.step / 2;
            setTimeout(this.timer, 0, axis, side, ++n);
        }
    };
}
