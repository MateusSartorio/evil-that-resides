class Scene1 extends Phaser.Scene {
    constructor() {
        super('scene1')
    }

    preload () {
        /*---------------------- Scenery ----------------------*/
        this.load.image('background', '../../assets/backgrounds/background2.png')
        

        /*---------------------- Player ----------------------*/
        //Player spritesheets
        this.load.spritesheet('player-aiming-spritesheet', '../../assets/player/aiming.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('player-death-spritesheet', '../../assets/player/death.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('player-idle-spritesheet', '../../assets/player/idle.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('player-running-spritesheet', '../../assets/player/running.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('player-shooting-spritesheet', '../../assets/player/shooting.png', { frameWidth: 240, frameHeight: 240 })


        /*---------------------- Guns ----------------------*/
        //Handgun
        this.load.image('handgun-bullet', '../../assets/guns/handgun/bullet.png')

        this.load.spritesheet('handgun-aiming-spritesheet', '../../assets/guns/handgun/animations/aiming.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('handgun-death-spritesheet', '../../assets/guns/handgun/animations/death.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('handgun-idle-spritesheet', '../../assets/guns/handgun/animations/idle.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('handgun-running-spritesheet', '../../assets/guns/handgun/animations/running.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('handgun-shooting-spritesheet', '../../assets/guns/handgun/animations/shooting.png', { frameWidth: 240, frameHeight: 240 })

        this.load.audio('handgun-fire', ['../../assets/guns/handgun/sound/fire.ogg', '../../assets/guns/handgun/sound/fire.mp3'])
        this.load.audio('handgun-no-bullet', ['../../assets/guns/handgun/sound/no_bullet.ogg', '../../assets/guns/handgun/sound/no_bullet.mp3'])

        //Rifle
        this.load.image('rifle-bullet', '../../assets/guns/rifle/bullet.png')

        this.load.spritesheet('rifle-aiming-spritesheet', '../../assets/guns/rifle/animations/aiming.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('rifle-death-spritesheet', '../../assets/guns/rifle/animations/death.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('rifle-idle-spritesheet', '../../assets/guns/rifle/animations/idle.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('rifle-running-spritesheet', '../../assets/guns/rifle/animations/running.png', { frameWidth: 240, frameHeight: 240 })
        this.load.spritesheet('rifle-shooting-spritesheet', '../../assets/guns/rifle/animations/shooting.png', { frameWidth: 240, frameHeight: 240 })

        this.load.audio('rifle-fire', ['../../assets/guns/rifle/sound/fire.ogg', '../../assets/guns/rifle/sound/fire.mp3'])
        this.load.audio('rifle-no-bullet', ['../../assets/guns/rifle/sound/no_bullet.ogg', '../../assets/guns/rifle/sound/no_bullet.mp3'])


        /*---------------------- Zombies ----------------------*/
        //Zombie spritesheets
        this.load.spritesheet('zombie-death-spritesheet', '../../assets/zombie/death.png', { frameWidth: 240, frameHeight: 240 })
    }

    create () {
        //Creates the background for the game
        background = this.add.image(0, 0, 'background').setOrigin(0, 0)

        this.createAnimations(this)

        //Creates zombies
        //Ṕarameters: x and y position, "this" is for praticalities purposes, always should be passed
        zombies = [
            new Zombie(1200, 400, this),
            new Zombie(1100, 600, this),
            new Zombie(1000, 500, this)
        ]

        /*---------------------- Guns ----------------------*/
        //bulletSpeed, fireRate, capacity, bulletType, height, bulletSprite, fireSound, noBulletSound, aimingAnimation, deathAnimation, idleAnimation, runninAnimation, shootingAnimation, context
        handgun = new Gun(3000, 600, 7, 'handgun', -16, 'handgun-bullet', 'handgun-fire', 'handgun-no-bullet', 'handgun-aiming', 'handgun-putting-aim', 'handgun-death', 'handgun-dead', 'handgun-idle', 'handgun-running', 'handgun-shooting', this)
        rifle = new Gun(3000, 1000, 20, 'rifle', -19, 'rifle-bullet', 'rifle-fire', 'rifle-no-bullet', 'rifle-aiming', 'rifle-putting-aim', 'rifle-death', 'rifle-dead', 'rifle-idle', 'rifle-running', 'rifle-shooting', this)

        //Creates player
        //x, y, gun, pistolAmmo, rifleAmmo, context
        player = new Player(800, 550, handgun, 14, 20, this)

        //Adds collision between the player and all of the zombies
        for(let i = 0; i < zombies.length; i++) {
            this.physics.add.collider(player.entity, zombies[i].entity, () => player.dies(zombies[i].entity), null, this)
        }   


        //Creates camera that follows player
        camera = this.cameras.main
        camera.setBounds(0, 0, background.displayWidth, background.displayHeight)
        camera.startFollow(player.entity)


        //  Input Events
        keyboard = this.input.keyboard.addKeys({
            'up':       Phaser.Input.Keyboard.KeyCodes.W,
            'down':     Phaser.Input.Keyboard.KeyCodes.S,
            'left':     Phaser.Input.Keyboard.KeyCodes.A,
            'right':    Phaser.Input.Keyboard.KeyCodes.D,
            'space':    Phaser.Input.Keyboard.KeyCodes.SPACE,
            'r':        Phaser.Input.Keyboard.KeyCodes.R,
            'one':      Phaser.Input.Keyboard.KeyCodes.ONE,
            'two':      Phaser.Input.Keyboard.KeyCodes.TWO
        })
        // keyboard = this.input.keyboard.createCursorKeys()

        hudText = this.add.text(16, 16, `Pistola: ${player.handgunAmmo}\nFuzil: ${player.rifleAmmo}\nNo pente: ${player.gun.bulletsOnMagazine}`, { fontSize: '32px'});
    }

    update () {
        hudText.x = camera.scrollX + 20;
        hudText.y = camera.scrollY + 20;

        if(player.dead)
            return

        if(keyboard.space.isDown) {
            player.gun.fire(this, player)
            hudText.setText(`Pistola: ${player.handgunAmmo}\nFuzil: ${player.rifleAmmo}\nNo pente: ${player.gun.bulletsOnMagazine}`)
            return
        }
        else {
            if(keyboard.one.isDown) {
                player.gun.justShot = false

                if(player.gun !== handgun) {
                    player.gun = handgun
                    hudText.setText(`Pistola: ${player.handgunAmmo}\nFuzil: ${player.rifleAmmo}\nNo pente: ${player.gun.bulletsOnMagazine}`)
                }
                    
            }
            if(keyboard.two.isDown) {
                player.gun.justShot = false

                if(player.gun != rifle) {
                    player.gun = rifle
                    hudText.setText(`Pistola: ${player.handgunAmmo}\nFuzil: ${player.rifleAmmo}\nNo pente: ${player.gun.bulletsOnMagazine}`)
                }
                    
            }
        }
        //Bug: Gun is not changing properly

        if(keyboard.r.isDown) {
            player.reload()
            hudText.setText(`Pistola: ${player.handgunAmmo}\nFuzil: ${player.rifleAmmo}\nNo pente: ${player.gun.bulletsOnMagazine}`)
        }

        if (keyboard.right.isDown) {
            player.facing = 'right'
            player.entity.setScale(playerScale, playerScale)
            player.entity.setVelocityX(160)
            player.running()
            
        }
        else if (keyboard.left.isDown) {
            player.facing = 'left'
            player.entity.setScale(-playerScale, playerScale)
            player.entity.setVelocityX(-160)
            player.running()
        }
        
        else {
            player.entity.setVelocityX(0)
            player.idle()
        }

        if (keyboard.up.isDown) {
            player.entity.setVelocityY(-160)
        }
        else if(keyboard.down.isDown) {
            player.entity.setVelocityY(160)
        }
        else {
            player.entity.setVelocityY(0)
        }
    }

    createAnimations(context) {

        /*---------------------- Handgun ----------------------*/
        context.anims.create({
            key: 'handgun-aiming',
            frames: context.anims.generateFrameNumbers('handgun-aiming-spritesheet', { start: 5, end: 5}),
            frameRate: fps,
            repeat: -1,
        })
        context.anims.create({
            key: 'handgun-putting-aim',
            frames: context.anims.generateFrameNumbers('handgun-aiming-spritesheet', { start: 0, end: 5}),
            frameRate: fps,
            repeat: 0,
        })
        context.anims.create({
            key: 'handgun-death',
            frames: context.anims.generateFrameNumbers('handgun-death-spritesheet', { start: 0, end: 7}),
            frameRate: fps,
            repeat: 0,
        })
        context.anims.create({
            key: 'handgun-dead',
            frames: context.anims.generateFrameNumbers('handgun-death-spritesheet', { start: 7, end: 7}),
            frameRate: fps,
            repeat: 0,
        })
        context.anims.create({
            key: 'handgun-idle',
            frames: context.anims.generateFrameNumbers('handgun-idle-spritesheet', { start: 0, end: 3 }),
            frameRate: fps/1.5,
            repeat: -1,
        })
        //There is no need for a left animation
        context.anims.create({
            key: 'handgun-running',
            frames: context.anims.generateFrameNumbers('handgun-running-spritesheet', { start: 0, end: 13 }),
            frameRate: fps,
            repeat: -1,
        })
        context.anims.create({
            key: 'handgun-shooting',
            frames: context.anims.generateFrameNumbers('handgun-shooting-spritesheet', { start: 0, end: 3 }),
            frameRate: fps,
            repeat: 0,
        })


        /*---------------------- Rifle ----------------------*/
        context.anims.create({
            key: 'rifle-aiming',
            frames: context.anims.generateFrameNumbers('rifle-aiming-spritesheet', { start: 7, end: 7}),
            frameRate: fps,
            repeat: -1,
        })
        context.anims.create({
            key: 'rifle-putting-aim',
            frames: context.anims.generateFrameNumbers('rifle-aiming-spritesheet', { start: 0, end: 6}),
            frameRate: fps,
            repeat: 0,
        })
        context.anims.create({
            key: 'rifle-death',
            frames: context.anims.generateFrameNumbers('rifle-death-spritesheet', { start: 0, end: 7}),
            frameRate: fps,
            repeat: 0,
        })
        context.anims.create({
            key: 'rifle-dead',
            frames: context.anims.generateFrameNumbers('rifle-death-spritesheet', { start: 7, end: 7}),
            frameRate: fps,
            repeat: 0,
        })
        context.anims.create({
            key: 'rifle-idle',
            frames: context.anims.generateFrameNumbers('rifle-idle-spritesheet', { start: 0, end: 3 }),
            frameRate: fps/1.5,
            repeat: -1,
        })
        //There is no need for a left animation
        context.anims.create({
            key: 'rifle-running',
            frames: context.anims.generateFrameNumbers('rifle-running-spritesheet', { start: 0, end: 13 }),
            frameRate: fps,
            repeat: -1,
        })
        context.anims.create({
            key: 'rifle-shooting',
            frames: context.anims.generateFrameNumbers('rifle-shooting-spritesheet', { start: 0, end: 3 }),
            frameRate: fps,
            repeat: 0,
        })


        /*---------------------- Player without a gun ----------------------*/
        context.anims.create({
            key: 'player-aiming',
            frames: context.anims.generateFrameNumbers('player-aiming-spritesheet', { start: 7, end: 7}),
            frameRate: fps,
            repeat: -1,
        })
        context.anims.create({
            key: 'player-putting-aim',
            frames: context.anims.generateFrameNumbers('player-aiming-spritesheet', { start: 0, end: 6}),
            frameRate: fps,
            repeat: 0,
        })
        context.anims.create({
            key: 'player-death',
            frames: context.anims.generateFrameNumbers('player-death-spritesheet', { start: 0, end: 7}),
            frameRate: fps,
            repeat: 0,
        })
        context.anims.create({
            key: 'player-dead',
            frames: context.anims.generateFrameNumbers('player-death-spritesheet', { start: 7, end: 7}),
            frameRate: fps,
            repeat: 0,
        })
        context.anims.create({
            key: 'player-idle',
            frames: context.anims.generateFrameNumbers('player-idle-spritesheet', { start: 0, end: 3 }),
            frameRate: fps/1.5,
            repeat: -1,
        })
        //There is no need for a left animation
        context.anims.create({
            key: 'player-running',
            frames: context.anims.generateFrameNumbers('player-running-spritesheet', { start: 0, end: 13 }),
            frameRate: fps,
            repeat: -1,
        })
        context.anims.create({
            key: 'player-shooting',
            frames: context.anims.generateFrameNumbers('player-shooting-spritesheet', { start: 0, end: 3 }),
            frameRate: fps,
            repeat: 0,
        })


        /*---------------------- Zombies ----------------------*/

        context.anims.create({
            key: 'zombie-idle',
            frames: context.anims.generateFrameNumbers('zombie-death-spritesheet', { start: 0, end: 0 }),
            frameRate: fps,
            repeat: -1,
        })

        context.anims.create({
            key: 'zombie-death',
            frames: context.anims.generateFrameNumbers('zombie-death-spritesheet', { start: 0, end: 6 }),
            frameRate: fps,
            repeat: 0,
        })

        context.anims.create({
            key: 'zombie-dead',
            frames: context.anims.generateFrameNumbers('zombie-death-spritesheet', { start: 6, end: 6 }),
            frameRate: fps,
            repeat: -1,
        })

    }
}