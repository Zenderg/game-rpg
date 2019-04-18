import global from "./globalVariables";
import Character from "./Character";
import controls from "./controls";
import {activeKeys} from "./helpers";

const init = () => {
    const field = createCanvas();
    global.ctx = field.getContext('2d');

    global.pers = new Character(10, 10, global.ctx);

    window.requestAnimationFrame(draw);
};

const draw = () => {
    global.ctx.clearRect(0,0, global.width, global.height);
    global.pers.createCharacter();

    controls(activeKeys());

    window.requestAnimationFrame(draw);
};

const createCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.height = global.height;
    canvas.width = global.width;
    canvas.id = 'field';
    document.body.appendChild(canvas);

    return canvas;
};

export default init;
