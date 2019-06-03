import Creature from "./Creature";

interface agro {
    agro: boolean,
    targetInAgroRadius: boolean,
    agroRadius: number,
    agroDelay: number,
    agroDelayTimer: number
}

interface startPosition {
    x: number,
    y: number
}

export default class Monster extends Creature {
    private readonly speed: number;
    private agroConfig: agro = {
        agro: false,
        targetInAgroRadius: false,
        agroRadius: 150,
        agroDelay: 2000,
        agroDelayTimer: 0
    };
    private target!: Phaser.Physics.Arcade.Sprite;
    private readonly startPosition:startPosition ={x:0, y:0};

    agroWatcher = new Proxy(this.agroConfig, {
        get: (target: any, prop: string) => {
            return target[prop];
        },
        set: (target: any, prop: string, value: number) => {
            // console.log(target, prop, value);
            if(prop === "targetInAgroRadius" && value){
                target.agro = true;
                clearTimeout(target.agroDelayTimer);
                target.agroDelayTimer = setTimeout(()=>{
                    target.agro = false;
                    this.returnToStart();
                    }, target.agroDelay);
            }
            else{
                target[prop] = value;
            }
            return true;
        }
    });

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string | number) {
        super(scene, x, y, texture, frames);

        this.startPosition.x = x;
        this.startPosition.y = y;

        // HP
        this.hp.max = 10;
        this.hp.current = 10;
        this.hpBarConfig = {
            x: 250,
            y: 10,
            color: 0x15fa03,
            fixed: true
        };
        this.updateHpBar();

        this.speed = 50;

        this.scene.events.on('update', this.updateScene);
    }

    private updateScene = () => {
        this.checkAgro(this.target);
        this.chaseTarget(this.target);
        this.debugAgroRange();
        console.log(this);
    };

    public initAgro = (target: Phaser.Physics.Arcade.Sprite) => {
        this.target = target;
    };

    private checkAgro = (target: Phaser.Physics.Arcade.Sprite) => {
        if (target) {
            const centerCords = this.body.center;
            const targetCenterCords = this.target.body.center;
            const distance = Phaser.Math.Distance.Between(centerCords.x, centerCords.y, targetCenterCords.x, targetCenterCords.y);
            if (distance <= this.agroWatcher.agroRadius) {
                this.agroWatcher.targetInAgroRadius = true;

            } else {
                this.agroWatcher.targetInAgroRadius = false;
            }
        }
    };

    private chaseTarget(obj: Phaser.Physics.Arcade.Sprite) {
        if (this.agroWatcher.agro) {
            this.scene.physics.moveToObject(this, obj, this.speed);
        }
    }

    private returnToStart = () => {
      this.scene.physics.moveTo(this, this.startPosition.x, this.startPosition.y, this.speed);
    };

    private debugAgroRange = () => {
        if(this.graphics) this.graphics.destroy();

        this.circle = new Phaser.Geom.Circle(this.body.center.x, this.body.center.y, this.agroConfig.agroRadius);
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }});
        this.graphics.strokeCircleShape(this.circle);
    }
}