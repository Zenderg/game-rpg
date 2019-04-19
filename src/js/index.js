import '../scss/style.scss'
import {markKey, resetControls} from './helpers';
import init from './initCanvas';

window.onload = () => {
  init();
  document.addEventListener("keydown", (e) => {
      const key = +e.keyCode;

      if (key === 18) {// Alt
        resetControls();
        return false;
      }

      markKey(key, true);
  });
  document.addEventListener("keyup", (e) => {
    const key = +e.keyCode;
    markKey(key, false);
  })
};

