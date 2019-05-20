import Creature from "./Creature";

interface hp {
    current: number,
    max: number
}

export default class Anna extends Creature {
    private _hp: hp = {current: 0, max: 0};
    private hpBar: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string | number) {
        super(scene, x, y, texture, frames);
        this._hp.max = 10;
        this._hp.current = 10;
        this.hpBar = scene.add.graphics({
            fillStyle: {
                color: 0x15fa03
            }
        });
        (<any>Object).observe(this._hp, this.updateHpBar);
    }

    private updateHpBar = () => {
        this.hpBar.fillRect(400, 400, (this._hp.current / this._hp.max) * 10, 5).setDepth(2);
        console.log(11111111111111111111111111111);
    };

    get hp(): number {
        return this._hp;
    }

    set hp(hp:{current:number, max?:number}) {
        this._hp = {...this.hp, hp};
    }
}
