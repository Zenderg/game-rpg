import Creature from "./Creature";

interface hp {
    current: number,
    max: number
}

export default class Anna extends Creature {
    private hp: hp = {current: 0, max: 0};
    private hpBar: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string | number) {
        super(scene, x, y, texture, frames);
        this.hp.max = 10;
        this.hp.current = 10;
        this.hpBar = scene.add.graphics({
            fillStyle: {
                color: 0x15fa03
            }
        });
        (<any>Object).observe(this.hp, this.updateHpBar);
    }

    private updateHpBar = () => {
        this.hpBar.fillRect(400, 400, (this.hp.current / this.hp.max) * 10, 5).setDepth(2);
        console.log(11111111111111111111111111111);
    };
}
