let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 675,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: gravity },
            debug: false
        }
    },
    // scene: {
    //     preload: preload,
    //     create: create,
    //     update: update
    // },
    scene: [Scene1],
}

let game = new Phaser.Game(config)