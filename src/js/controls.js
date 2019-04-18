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
          87: global.pers.up,
          65: global.pers.left,
          83: global.pers.down,
          68: global.pers.right,
          38: global.pers.up,
          37: global.pers.left,
          40: global.pers.down,
          39: global.pers.right,
      };
  }
};

export default controls;
