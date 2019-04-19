import global from '../globalVariables';

const renderCreatures = () =>{
  renderCharacters();
  renderNPC();
  renderMonster();
};

const renderCharacters = () => {
  global.characters.map(character => {
    character.create();
    character.showName();
  });
};

const renderNPC = () => {
  global.npcs.map(npc => {
    npc.create();
    npc.showName();
    npc.move();
  });
};

const renderMonster = () => {
  global.monsters.map(monster => {
    monster.create();
    monster.showName();
    monster.showAgroRange();
    monster.agro(global.characters[0])
  });
};

export default renderCreatures;