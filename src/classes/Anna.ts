import Creature from "./Creature";

export default class Anna extends Creature {
    keyboard!: { [index: string]: Phaser.Input.Keyboard.Key };

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, keyboard: { [index: string]: Phaser.Input.Keyboard.Key }, frames?: string | number) {
        super(scene, x, y, texture, frames);
        this.keyboard = keyboard;
        this.createAnims();
        this.hp.max = 10;
        this.hp.current = 10;
        this.hpBarConfig = {
            x: 25,
            y: 10,
            color: 0x15fa03,
            fixed: true
        };
        this.updateHpBar();
        this.scene.events.on('update', this.updateScene);
    }

    updateScene = (time: number, delta: number) => {
        this.checkControls();
    };
    private checkControls = () => {
        if (this.active) {
            if (this.keyboard.D.isDown) {
                this.setVelocityX(128);
            }
            if (this.keyboard.A.isDown) {
                this.setVelocityX(-128);
            }
            if (this.keyboard.W.isDown) {
                this.setVelocityY(-128);
            }
            if (this.keyboard.S.isDown) {
                this.setVelocityY(128);
            }

            if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
                this.setVelocityX(0);
            }
            if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
                this.setVelocityY(0);
            }

            if (this.body.velocity.x > 0) {
                this.play("right", true);
            } else if (this.body.velocity.x < 0) {
                this.anims.playReverse("left", true);
            } else if (this.body.velocity.y < 0) {
                this.play("up", true);
            } else if (this.body.velocity.y > 0) {
                this.play("down", true);
            }
        }
    };
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