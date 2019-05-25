import Creature from "./Creature";

export default class Anna extends Creature {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string | number) {
        super(scene, x, y, texture, frames);
        this.createAnims();
        this.hp.max = 10;
        this.hp.current = 10;
        this.hpBarConfig = {
            x: 25,
            y: 10,
            color: 0x15fa03,
            fixed:true
        };
        this.updateHpBar();
    }

    private createAnims = () => {
        this.anims.animationManager.create({
            key: 'right',
            frameRate: 10,
            frames: this.anims.animationManager.generateFrameNumbers('anna', {
                start: 27,
                end: 35
            })
        });
        this.anims.animationManager.create({
            key: 'left',
            frameRate: 10,
            frames: this.anims.animationManager.generateFrameNumbers('anna', {
                start: 9,
                end: 17
            })
        });
        this.anims.animationManager.create({
            key: 'up',
            frameRate: 10,
            frames: this.anims.animationManager.generateFrameNumbers('anna', {
                start: 0,
                end: 8
            })
        });
        this.anims.animationManager.create({
            key: 'down',
            frameRate: 10,
            frames: this.anims.animationManager.generateFrameNumbers('anna', {
                start: 18,
                end: 26
            })
        });
    }
}