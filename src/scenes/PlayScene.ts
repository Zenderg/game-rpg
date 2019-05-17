import {CST} from "../CST";
import Anna from "../classes/Anna";

export class PlayScene extends Phaser.Scene{
    anna!: Phaser.Physics.Arcade.Sprite;
    hooded!: Phaser.Physics.Arcade.Sprite;
    keyboard!: {[index: string]: Phaser.Input.Keyboard.Key};
    assassins!: Phaser.Physics.Arcade.Group;
    fireAttacks!: Phaser.Physics.Arcade.Group;
    constructor(){
        super({
            key: CST.SCENES.PLAY
        })
    }
    init(){}
    preload(){
        this.animsCreate();
        this.textures.addSpriteSheetFromAtlas("hooded", {frameHeight: 64, frameWidth: 64, atlas:"characters", frame: "hooded"});
        this.textures.addSpriteSheetFromAtlas("mandy", {frameHeight: 64, frameWidth: 64, atlas:"characters", frame: "mandy"});

        this.load.tilemapTiledJSON("map", './assets/map2.json');
        this.load.image("tiles", './assets/tiles2.jpg');
    }
    create(){
        let pimple: Phaser.GameObjects.Sprite = this.add.sprite(100, 100,'daze');
        pimple.play('dazzle');

        this.anna = new Anna(this, 400, 400, 'anna', 26);
        const hpBar = this.add.graphics({
            fillStyle:{
                color: 0xffffff
            }
        });
        hpBar.fillRect(400, 400, 100, 5).setDepth(2);
        this.hooded = this.physics.add.sprite(200, 200, 'hooded').setDepth(1);
        this.assassins = this.physics.add.group({immovable: true});
        this.fireAttacks = this.physics.add.group();

        // create map
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('my-tiles', 'tiles');
        map.createStaticLayer('bg', tileset, 0, 0).setDepth(0);
        const buildings = map.createStaticLayer('buildings', tileset, 0, 0).setDepth(0);
        buildings.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.anna, buildings);
        this.physics.add.collider(this.assassins, buildings);
        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        //debug layers
        buildings.renderDebug(this.add.graphics(), {
           tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });

        // init following camera
        this.cameras.main.startFollow(this.anna);
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.anna.setSize(40,50).setOffset(10, 10);
        this.anna.setCollideWorldBounds(true);

        this.assassins.add(this.hooded);

        // pimple.on('animationupdate', () => {
        //     console.log("ОБНОВЛЯЮСЬ ХОЗЯИН");
        // });
        // pimple.on('animationrepeat', () => {
        //     console.log("НАЧИНАЮ ОБНОВЛЕНИЕ ЗАНОВО");
        // });

        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (pointer.isDown){
                let fire = this.add.sprite(pointer.worldX, pointer.worldY, 'daze', 'fire00.png').play('blaze');

                this.fireAttacks.add(fire);

                fire.on('animationcomplete', () => {
                    fire.destroy();
                })
            }
        });

        this.physics.world.addCollider(this.anna, this.assassins, (anna: Phaser.Physics.Arcade.Sprite, hooded: Phaser.Physics.Arcade.Sprite) => {
            hooded.destroy();
            this.anna.hp--;
            if (this.anna.hp <= 0) anna.destroy();
            console.log(this.anna.hp);
            console.log();
            let x = Phaser.Math.Between(0, this.game.renderer.width);
            let y = Phaser.Math.Between(0, this.game.renderer.height);
            for(let i = 0; i < 2; i++){
                this.assassins.add(this.physics.add.sprite(x, y, 'hooded').setScale(2));
            }
        });
        this.physics.world.addCollider(this.fireAttacks, this.assassins, (fireAttacks: Phaser.Physics.Arcade.Sprite, hooded: Phaser.Physics.Arcade.Sprite) => {
            fireAttacks.destroy();
            hooded.destroy();
            console.log();
            let x = Phaser.Math.Between(0, this.game.renderer.width);
            let y = Phaser.Math.Between(0, this.game.renderer.height);
            for(let i = 0; i < 2; i++){
                this.assassins.add(this.physics.add.sprite(x, y, 'hooded').setScale(2));
            }
        });
    }
    update(time: number, delta: number){
        for(let i = 0; i< this.assassins.getChildren().length; i++) {
            const assasin = this.assassins.getChildren()[i];
            const distance = Phaser.Math.Distance.Between(assasin.x, assasin.y, this.anna.x, this.anna.y);
            let speed = 50;
            // if (distance <= 100) speed = 0;
            this.physics.moveToObject(assasin, this.anna, speed);
        }


            if(this.anna.active){
            if(this.keyboard.D.isDown){
                this.anna.setVelocityX(128);
            }

            if(this.keyboard.A.isDown){
                this.anna.setVelocityX(-128);
            }
            if(this.keyboard.W.isDown){
                this.anna.setVelocityY(-128);
            }

            if(this.keyboard.S.isDown){
                this.anna.setVelocityY(128);
            }
            if(this.keyboard.A.isUp && this.keyboard.D.isUp){
                this.anna.setVelocityX(0);
            }
            if(this.keyboard.W.isUp && this.keyboard.S.isUp){
                this.anna.setVelocityY(0);
            }

            if(this.anna.body.velocity.x > 0){
                this.anna.play("right", true);
            } else if(this.anna.body.velocity.x < 0){
                this.anna.anims.playReverse("left", true);
            } else if(this.anna.body.velocity.y < 0){
                this.anna.play("up", true);
            } else if(this.anna.body.velocity.y > 0){
                this.anna.play("down", true);
            }
        }
    },
    animsCreate(){
        this.anims.create({
            key: 'blaze',
            duration: 50,
            frames: this.anims.generateFrameNames('daze', {
                prefix: 'fire0',
                suffix: '.png',
                end: 55
            })
        });
        this.anims.create({
            key: 'dazzle',
            frameRate: 30,
            frames: this.anims.generateFrameNames('daze', {
                prefix: 'daze0',
                suffix: '.png',
                start: 0,
                end: 41
            }),
            repeat: -1
        });
        this.anims.create({
            key:'right',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('anna', {
                start: 27,
                end: 35
            })
        });
        this.anims.create({
            key:'left',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('anna', {
                start: 9,
                end: 17
            })
        });
        this.anims.create({
            key:'up',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('anna', {
                start: 0,
                end: 8
            })
        });
        this.anims.create({
            key:'down',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('anna', {
                start: 18,
                end: 26
            })
        });
    }
}
