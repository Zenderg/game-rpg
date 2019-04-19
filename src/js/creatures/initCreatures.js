import global from '../globalVariables';
import Character from '../Character';
import NPC from '../NPC';
import Monster from '../Monster';

const initCreatures = () => {
  global.pers = new Character(10, 10, 'Hero 1');
  global.npc = new NPC(600,600, "Служанка Мери");
  global.monster = new Monster(300, 300, "Волк");
};
export default initCreatures;