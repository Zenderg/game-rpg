import global from "./globalVariables";
import Character from "./Character";
import NPC from './NPC';
import Monster from './Monster';
import controls from "./controls";
import {activeKeys} from "./helpers";

const init = () => {
    const field = createCanvas();
    global.ctx = field.getContext('2d');

    global.pers = new Character(10, 10);
    global.npc = new NPC(600,600);
    global.monster = new Monster(300, 300);

    window.requestAnimationFrame(draw);
};

const draw = () => {
    global.ctx.clearRect(0,0, global.width, global.height);
    global.pers.create();
    global.npc.create();
    global.npc.move();
    global.monster.create();

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
