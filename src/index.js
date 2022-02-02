/*-------------------------------------- Constantes --------------------------------------*/

//General
const xSize = window.innerWidth
const ySize = window.innerWidth
const playerScale = 0.5
const fps = 10

//Physics
const gravidade = 0

//Guns
const bulletSpeed = 3000

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 675,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: gravidade },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
}

let game = new Phaser.Game(config);

function preload ()
{
    //Loading images
    this.load.image('background', '../assets/backgrounds/background2.png')
    this.load.image('bullet', '../assets/guns/bullet.png')

    //Loading sprites
    this.load.spritesheet('player', '../assets/Ellie Sprite sheet/Spritesheet/Ellie spritesheet.png', { frameWidth: 240, frameHeight: 240 })
    this.load.spritesheet('zombie', '../assets/Zombie/death.png', { frameWidth: 240, frameHeight: 240 })

    //Loading audio
    this.load.audio('gunshot', ['../assets/sounds/gusnhot.ogg', '../assets/sounds/gunshot.mp3'])
}

//Scenery
let background

//Player Stuff
let player
let camera

//Enemies
let zombie1

//Input
let keyboard
let mouse

//Guns
let gunShotSound

function create ()
{
    //Creates the background for the game
    background = this.add.image(0, 0, 'background').setOrigin(0, 0)

    //Creates player
    player = this.physics.add.sprite(800, 550, 'player').setScale(playerScale)

    //Creates camera that follows player
    camera = this.cameras.main
    camera.setBounds(0, 0, background.displayWidth, background.displayHeight)
    camera.startFollow(player)

    //Creates zombie 1
    zombie1 = this.physics.add.sprite(1000, 500, 'zombie').setScale(playerScale)

    /*---------------------- Animations ----------------------*/

    //Player animations
    this.anims.create({
        key: 'player-idle',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: fps/1.5,
        repeat: -1,
    })

    //There is no need for a left animation
    this.anims.create({
        key: 'player-right',
        frames: this.anims.generateFrameNumbers('player', { start: 16, end: 29 }),
        frameRate: fps,
        repeat: -1,
    })

    this.anims.create({
        key: 'fire',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: fps,
        repeat: 0,
    })

    //Zombies animations
    this.anims.create({
        key: 'zombie-idle',
        frames: this.anims.generateFrameNumbers('zombie', { start: 0, end: 0 }),
        frameRate: fps,
        repeat: -1,
    })

    this.anims.create({
        key: 'zombie-death',
        frames: this.anims.generateFrameNumbers('zombie', { start: 0, end: 6 }),
        frameRate: fps,
        repeat: 0,
    })

    this.anims.create({
        key: 'zombie-dead',
        frames: this.anims.generateFrameNumbers('zombie', { start: 6, end: 6 }),
        frameRate: fps,
        repeat: -1,
    })


    //  Input Events
    keyboard = this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S, 'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D, 'space': Phaser.Input.Keyboard.KeyCodes.SPACE})
    // keyboard = this.input.keyboard.createCursorKeys()


    gunShotSound = this.sound.add('gunshot')








    // //  Here we create the ground.
    // //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // //  Now let's create some ledges
    // platforms.create(600, 400, 'ground');
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');

    // The player and its settings
    
    // camera.setLerp(0,0)
    // console.log(background.displayWidth, background.displayHeight)
    // this.cameras.main.startFollow(this.player)

    //  Player physics properties. Give the little guy a slight bounce.
    // player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    
    

    

    


    
    
    // keyboard = this.input.keyboard.addKeys({up:KeyCodes.W,down:KeyCodes.S,left:KeyCodes.A,right:KeyCodes.S});

    // //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    // stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 11,
    //     setXY: { x: 12, y: 0, stepX: 70 }
    // });

    // stars.children.iterate(function (child) {

    //     //  Give each star a slightly different bounce
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    // });

    // bombs = this.physics.add.group();

    // //  The score
    // scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // //  Collide the player and the stars with the platforms
    // this.physics.add.collider(player, zombie);
    // this.physics.add.collider(stars, platforms);
    // this.physics.add.collider(bombs, platforms);

    // //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // this.physics.add.overlap(player, stars, collectStar, null, this);

    // this.physics.add.collider(player, bombs, hitBomb, null, this);

    
}


let dead = false, shot = false
let facing = 'right'

function update ()
{
    if(!dead)
        zombie1.anims.play('zombie-idle', true)

    if(keyboard.space.isDown) {

        if(!shot) {
            gunShotSound.play()
            shot = true
            player.anims.play('fire')

            renderBullet(this, -19, 'bullet')

            player.setVelocityX(0)
            player.setVelocityY(0)
        }
                
        return
    }

    if(shot === true && keyboard.space.isUp)
        shot = false

    if (keyboard.left.isDown) {
        facing = 'left'
        player.setScale(-playerScale, playerScale)
        player.setVelocityX(-160)
        player.anims.play('player-right', true)
    }
    else if (keyboard.right.isDown) {
        facing = 'right'
        player.setScale(playerScale, playerScale)
        player.setVelocityX(160)
        player.anims.play('player-right', true)
        
    }
    else {
        player.setVelocityX(0)
        player.anims.play('player-idle', true)
    }

    if (keyboard.up.isDown) {
        player.setVelocityY(-160)        
    }
    else if(keyboard.down.isDown) {
        player.setVelocityY(160)
    }
    else {
        player.setVelocityY(0)
    }
}

let bullet
let scale

function renderBullet(context, gunHeight, bulletModel) {

    let speed = bulletSpeed

    // console.log(player.body.velocity.x >= 0)
    if(facing === 'right') {
        speed = bulletSpeed
        scale = 1
    }
        
    else {
        speed = -1*bulletSpeed
        scale = -1

    }       

    bullet = context.physics.add.sprite(player.x, player.y + gunHeight, bulletModel).setScale(playerScale*0.2*scale).setVelocityX(speed)

    context.physics.add.collider(bullet, zombie1, bulletHit, null, context);
}

//TODO: Make the function generic to every zombie
function bulletHit(context) {
    zombie1.setVelocityX(0)
    zombie1.setVelocityY(0)
    bullet.destroy()
    if(!dead) {
        zombie1.setVelocityX(0)
        zombie1.setVelocityY(0)
        zombie1.anims.play('zombie-death')
        zombie1.body.enable = false
        dead = true
    }
}

// function collectStar (player, star)
// {
//     star.disableBody(true, true);

//     //  Add and update the score
//     score += 10;
//     scoreText.setText('Score: ' + score);

//     if (stars.countActive(true) === 0)
//     {
//         //  A new batch of stars to collect
//         stars.children.iterate(function (child) {

//             child.enableBody(true, child.x, 0, true, true);

//         });

//         let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

//         let bomb = bombs.create(x, 16, 'bomb');
//         bomb.setBounce(1);
//         bomb.setCollideWorldBounds(true);
//         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
//         bomb.allowGravity = false;

//     }
// }

// function hitBomb (player, bomb)
// {
//     this.physics.pause();

//     player.setTint(0xff0000);

//     player.anims.play('turn');

//     gameOver = true;
// }
  