interface hp {
    current: number,
    max: number
}

interface hpBar {
    x:number,
    y:number,
    color:number,
    fixed:boolean
}

export default abstract class Creature extends Phaser.Physics.Arcade.Sprite{
    protected hp: hp = {
        current: 0,
        max: 0
    };

    protected hpBarConfig: hpBar = {
        x: 0,
        y: 0,
        color: 0x15fa03,
        fixed:false
    };

    private _hpBar!: Phaser.GameObjects.Graphics;
    // @ts-ignore
    hpWatcher = new Proxy(this.hp, {
        get: (target:any, prop:string) => {
            return target[prop];
        },
        set: (target:any, prop:string, value:number) => {
            if(this.checkDeath()) return true;
            target[prop] = value;
            this.updateHpBar();
            return true;
        }
    });

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string | number){
        super(scene, x, y, texture, frames);
        // create and display object in game
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
        this.setOrigin(0, 0).setDepth(1);

        console.log(this._hpBar);
    }

    public reduceHp = (val: number) => {
        this.hpWatcher.current = this.hp.current + val;
    };

    protected updateHpBar = () => {
        if(this.hpBar) {
            this.scene.sys.updateList.remove(this._hpBar);
            this.scene.sys.displayList.remove(this._hpBar);
        }
        this.hpBar = this.hpBarConfig;

    };
    // @ts-ignore
    private get hpBar():object {
        return this._hpBar;
    };

    // @ts-ignore
    private set hpBar(config:hpBar) {
        this._hpBar = this.scene.add.graphics({
            fillStyle: {
                color: config.color
            }
        });
        console.log(this);
        this._hpBar.fillRect(config.x, config.y, (this.hp.current / this.hp.max) * 100, 5).setDepth(2);
        if(config.fixed) this._hpBar.setScrollFactor(0, 0);
    }

    private checkDeath = () => {
        if (this.hp.current <= 0) {
            this.destroy();
            return true;
        }
        return false
    };
}