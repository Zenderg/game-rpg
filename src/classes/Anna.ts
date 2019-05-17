import Creature from "./Creature";

export default class Anna extends Creature{
    hp: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string | number){
        super(scene, x, y, texture, frames);
        this.hp = 10;
        const hpBar = scene.add.graphics({
            fillStyle:{
                color: 0x15fa03
            }
        });
    }
}
