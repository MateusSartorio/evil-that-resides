class Player {
    constructor(x, y, gun, handgunAmmo, rifleAmmo, context) {
        this.entity = context.physics.add.sprite(x, y, 'player-idle-spritesheet').setScale(playerScale)
        this.gun = gun
        this.handgunAmmo = handgunAmmo
        this.rifleAmmo = rifleAmmo
        this.facing = 'right'
        this.dead = false
    }

    aiming() {
        this.gun.aiming(this)
    }
    
    puttingAim() {
        this.gun.puttingAim(this)
    }

    death() {
        this.gun.death(this)
    }

    dead() {
        this.gun.dead(this)
    }

    idle() {
        this.gun.idle(this)
    }

    running() {
        this.gun.running(this)
    }

    shooting() {
        this.gun.shooting(this)
    }

    reload() {
        if(this.gun.bulletType == 'handgun') {
            this.handgunAmmo = this.gun.reload(this.handgunAmmo)
        }            
        else if(this.gun.bulletType == 'rifle') {
            this.rifleAmmo = this.gun.reload(this.rifleAmmo)
        }            
        else
            console.log("There is something wrong with ammo types in the reload function")
    }

    dies(zombieEntity) {
        //Game over
        zombieEntity.setVelocityX(0)
        zombieEntity.setVelocityY(0)
        this.entity.setVelocityX(0)
        this.entity.setVelocityY(0)
        this.death()
        this.dead = true
    }
}