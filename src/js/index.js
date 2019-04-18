import '../scss/style.scss'

const init = () => {
  const field = document.getElementById("field");
  const ctx = field.getContext('2d');

  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(0,0,10,10);
};

window.onload = () => {
  init();
};