import Creature from "./Creature";

export default class Monster extends Creature {
    private readonly speed: number;
    private agroZone!: Phaser.GameObjects.Zone;
    private target!: Phaser.Physics.Arcade.Sprite
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

        this.scene.events.on('update', this.updateScene);
    }

    private updateScene = () => {
      this.checkAgroZone(this.target);
    };

    public initAgroZone = (target: Phaser.Physics.Arcade.Sprite) =>{
        this.target = target;
        this.agroZone = this.scene.add.zone(this.body.x, this.body.y, 200, 200);
        this.agroZone.setOrigin(0.5, 0.5);
        this.scene.physics.world.enable(this.agroZone, 0);
        this.agroZone.body.moves = false;
        this.scene.physics.add.overlap(target, this.agroZone);

        this.agroZone.on("enterzone", () => {console.log("!!!!!!!!!!!");});
    };

    private checkAgroZone = (target) => {
        if(target){
            const touching = this.agroZone.body.touching;
            const wasTouching = this.agroZone.body.wasTouching;

            if (touching.none && !wasTouching.none) {
                this.agroZone.emit('leavezone');
            }
            else if (!touching.none && wasTouching.none) {
                this.agroZone.emit('enterzone');
            }

            this.agroZone.body.debugBodyColor = this.agroZone.body.touching.none ? 0x00ffff : 0xffff00;
        }
    };

    chaseTarget(obj: Phaser.Physics.Arcade.Sprite){
        this.scene.physics.moveToObject(this, obj, this.speed);
    }
}