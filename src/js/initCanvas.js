import global from "./globalVariables";
import controls from "./controls";
import {activeKeys} from "./helpers";
import initCreatures from './creatures/initCreatures';
import renderCreatures from './creatures/renderCreatures';

const init = () => {
    const field = createCanvas();
    global.ctx = field.getContext('2d');

    initCreatures();

    window.requestAnimationFrame(draw);
};

const draw = () => {
    global.ctx.clearRect(0,0, global.width, global.height);

    renderCreatures();

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
