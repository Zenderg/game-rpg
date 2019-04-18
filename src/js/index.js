import '../scss/style.scss'
import {markKey} from "./helpers";
import init from './initCanvas';

window.onload = () => {
  init();
  document.addEventListener("keydown", (e) => {
    const key = +e.keyCode;
    markKey(key, true);
  });
  document.addEventListener("keyup", (e) => {
    const key = +e.keyCode;
    markKey(key, false);
  })
};

