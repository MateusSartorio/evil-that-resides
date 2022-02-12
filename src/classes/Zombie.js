class Zombie {
    constructor(x, y, context) {
        this.entity = context.physics.add.sprite(x, y, 'zombie-death-spritesheet').setScale(playerScale)
        this.dead = false
        this.start() 
    }

    start() {
        this.entity.anims.play('zombie-idle', true)  
    }

    getHit(bullet) {
        bullet.destroy()
        if(!this.dead) {
            this.entity.anims.play('zombie-death')
            this.entity.body.enable = false
            this.dead = true
        }
    }
}