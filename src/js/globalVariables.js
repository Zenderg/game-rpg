export default {
  focus: document.hasFocus(),
  height: window.innerHeight,
  width: window.innerWidth,
  ctx:null,
  characters: [],
  npcs: [],
  monsters:[],
  keys:{
    87:false, // W
    65:false, // A
    83:false, // S
    68:false, // D
    38: false, // ArrowUp
    37: false, // ArrowLeft
    40: false, // ArrowDown
    39: false // ArrowRight
  }
}
