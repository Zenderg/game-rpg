import Creature from "./Creature";

interface hp {
    current: number,
    max: number
}

export default class Anna extends Creature {
    private hp: hp = {
        current: 0,
        max: 0
    };
    //@ts-ignore
    private hpBar: Phaser.GameObjects.Graphics;
    hpWatcher = new Proxy(this.hp, {
       get: (target:any, prop:string) => {
           console.log("getter");
           console.log(target);
           console.log(prop);
           return target[prop];
       },
        set: (target:any, prop:string, value:number) => {
            console.log("setter");
            // console.log(target);
            // console.log(prop);
            // console.log(value);
            if(this.checkDeath()) return true;
            console.log(this.checkDeath());
            target[prop] = value;
            this.updateHpBar();
            return true;
        }
    });

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string | number) {
        super(scene, x, y, texture, frames);
        this.hp.max = 10;
        this.hp.current = 10;
       this.updateHpBar();
    }
    private updateHpBar = () => {
        console.log(11111111111111111111111111111);
        console.log(this.hp.current, this.hp.max);
        console.log((this.hp.current / this.hp.max) * 100);
        if(this.hpBar) {
            this.scene.sys.updateList.remove(this.hpBar);
            this.scene.sys.displayList.remove(this.hpBar);
        }
        this.hpBar = this.scene.add.graphics({
            fillStyle: {
                color: 0x15fa03
            }
        });
        this.hpBar.fillRect(400, 400, (this.hp.current / this.hp.max) * 100, 5).setDepth(2);
    };

    private checkDeath = () => {
        if(this.hp.current <= 0) {
            this.destroy();
            return true;
        }
        return false
    };

    reduceHp = (val: number) => {
        this.hpWatcher.current = this.hp.current + val;
    };
}
