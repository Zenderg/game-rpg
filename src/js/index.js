import '../scss/style.scss'
import global from './globalVariables'
import Character from './Character'


const init = () => {
  const field = createCanvas();
  global.ctx = field.getContext('2d');

  global.pers = new Character(10, 10, global.ctx);

  window.requestAnimationFrame(draw);
};

const draw = () => {
  global.ctx.clearRect(0,0, global.width, global.height);
  global.pers.createCharacter();
  window.requestAnimationFrame(draw);
};

window.onload = () => {
  init();
  document.addEventListener("keydown", (e) => {
    const key = e.key;
    console.log(e);
    switch (key) {
      case 'w':
        global.pers.forward();
        break;
      case 'd':
        global.pers.right();
        break;
      case 'a':
        global.pers.left();
        break;
      case 's':
        global.pers.back();
        break;
      case 'ArrowUp':
        global.pers.forward();
        break;
      case 'ArrowDown':
        global.pers.back();
        break;
      case 'ArrowLeft':
        global.pers.left();
        break;
      case 'ArrowRight':
        global.pers.right();
        break;
      default:
        break
    }
  })
};

const createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.height = global.height;
  canvas.width = global.width;
  canvas.id = 'field';
  document.body.appendChild(canvas);

  return canvas;
};
