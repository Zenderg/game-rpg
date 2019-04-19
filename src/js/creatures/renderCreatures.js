import global from '../globalVariables';

const renderCreatures = () =>{
  renderPers();
  renderNPC();
  renderMonster();
};

const renderPers = () => {
  global.pers.create();
  global.pers.showName();
};

const renderNPC = () => {
  global.npc.create();
  global.npc.showName();
  global.npc.move();
};

const renderMonster = () => {
  global.monster.create();
  global.monster.showName();
  global.monster.showAgroRange();
};

export default renderCreatures;