import Creature from "./Creature";

export default class Monster extends Creature {
    private readonly speed: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string | number) {
        super(scene, x, y, texture, frames);

        this.hp.max = 10;
        this.hp.current = 10;
        this.hpBarConfig = {
            x: 250,
            y: 10,
            color: 0x15fa03,
            fixed:true
        };
        this.updateHpBar();

        this.speed = 50;
    }
    chaseTarget(obj: Phaser.Physics.Arcade.Sprite){
        this.scene.physics.moveToObject(this, obj, this.speed);
    }
}