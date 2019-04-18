import global from "./globalVariables";

const controls = (keys) => {
    // console.log(global.keys)
    const axis = {
        87: global.pers.up,
        65: global.pers.left,
        83: global.pers.down,
        68: global.pers.right,
        38: global.pers.up,
        37: global.pers.left,
        40: global.pers.down,
        39: global.pers.right,
    };

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

export default controls;
