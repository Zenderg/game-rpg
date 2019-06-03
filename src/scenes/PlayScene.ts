import {CST} from "../CST";
import Anna from "../classes/Anna";
import Monster from "../classes/Monster";

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
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

        let pimple: Phaser.GameObjects.Sprite = this.add.sprite(100, 100,'daze');
        pimple.play('dazzle');

        this.anna = new Anna(this, 400, 400, 'anna', this.keyboard, 26);
        this.hooded = new Monster(this, 200, 200, 'hooded');
        this.hooded.initAgro(this.anna);
        this.fireAttacks = this.physics.add.group();

        // create map
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('my-tiles', 'tiles');
        map.createStaticLayer('bg', tileset, 0, 0).setDepth(0);
        const buildings = map.createStaticLayer('buildings', tileset, 0, 0).setDepth(0);
        buildings.setCollisionByProperty({collides: true});

        // set collide for objects
        this.physics.add.collider(this.anna, buildings);
        this.physics.add.collider(this.hooded, buildings);
        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        //debug layers
        buildings.renderDebug(this.add.graphics(), {
           tileColor: 0,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });

        // init following camera
        this.cameras.main.startFollow(this.anna);
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.anna.setSize(40,50).setOffset(10, 10);
        this.anna.setCollideWorldBounds(true);

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (pointer.isDown){
                let fire = this.add.sprite(pointer.worldX, pointer.worldY, 'daze', 'fire00.png').play('blaze');

                this.fireAttacks.add(fire);

                fire.on('animationcomplete', () => {
                    fire.destroy();
                })
            }
        });
    }
    update(time: number, delta: number){
        // this.hooded.chaseTarget(this.anna);
    }
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
    }
}
