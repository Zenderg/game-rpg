import global from "./globalVariables";

let axis = {};

const controls = (keys) => {
    initAxis();
    keys.map(item => {
        try{
            axis[item]();
        }
        catch (e) {
            console.log(e);
            throw 'У такой клавиши нет привязки'
        }
    })
};

const initAxis = () =>{
  if(Object.keys(axis).length === 0){
      axis = {
          87: global.characters[0].up,
          65: global.characters[0].left,
          83: global.characters[0].down,
          68: global.characters[0].right,
          38: global.characters[0].up,
          37: global.characters[0].left,
          40: global.characters[0].down,
          39: global.characters[0].right,
      };
  }
};

export default controls;
