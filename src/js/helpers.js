import global from './globalVariables';

export const activeKeys = () => Object.keys(global.keys).filter(item => global.keys[item]);

export const markKey = (key, flag) => {
    if (global.keys[key] !== undefined) global.keys[key] = flag;
};
