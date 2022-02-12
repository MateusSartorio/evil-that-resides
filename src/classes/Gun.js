class Gun {
    constructor(bulletSpeed, fireRate, capacity, bulletType, height, bulletSprite, fireSound, noBulletSound, aimingAnimation, puttingAimAnimation, deathAnimation, deadAnimation, idleAnimation, runninAnimation, shootingAnimation, context) {
        //Mechanical properties of the gun
        this.bulletSpeed = bulletSpeed
        this.fireRate = fireRate
        this.capacity = capacity
        this.bulletType = bulletType

        //Properties that make the gun work in game
        this.height = height
        this.justShot = false
        this.bulletsOnMagazine = capacity

        //Gun assets
        this.bulletSprite = bulletSprite
        this.fireSound = context.sound.add(fireSound)
        this.noBulletSound = context.sound.add(noBulletSound)

        //Animations
        this.aimingAnimation = aimingAnimation
        this.puttingAimAnimation = puttingAimAnimation
        this.deathAnimation = deathAnimation
        this.deadAnimation = deadAnimation
        this.idleAnimation = idleAnimation
        this.runningAnimation = runninAnimation
        this.shootingAnimation = shootingAnimation
    }

    aiming(player) {
        player.entity.anims.play(this.aimingAnimation, true)
    }
    
    puttingAim(player) {
        player.entity.anims.play(this.puttingAimAnimation)
    }

    death(player) {
        player.entity.anims.play(this.deathAnimation)
    }

    dead(player) {
        player.entity.anims.play(this.deadAnimation)
    }

    idle(player) {
        player.entity.anims.play(this.idleAnimation, true)
    }

    running(player) {
        player.entity.anims.play(this.runningAnimation, true)
    }

    shooting(player) {
        player.entity.anims.play(this.shootingAnimation)
    }

    fire(context, player) {
        if(!this.justShot) {
            if(this.bulletsOnMagazine > 0) {
                this.fireSound.play()
                this.bulletsOnMagazine--
                player.shooting()
                this.renderBullet(context, player)
            }
            else {
                this.noBulletSound.play()
                player.aiming()
            }

            this.justShot = true
            let timeOut = setTimeout(() => {
                this.justShot = false
                clearTimeout(timeOut)
            }, this.fireRate)

            player.entity.setVelocityX(0)
            player.entity.setVelocityY(0)
        }
    }

    reload(ammo) {
        if(this.bulletsOnMagazine === this.capacity)
            return ammo

        let bulletsLacking = this.capacity - this.bulletsOnMagazine

        if(ammo >= bulletsLacking) {
            this.bulletsOnMagazine = this.capacity
            return ammo - bulletsLacking
        }            
        else {
            this.bulletsOnMagazine += ammo
            return 0
        }
    }

    renderBullet(context, player) {
        let bullet, scale
        let speed
        if(player.facing === 'right') {
            speed = this.bulletSpeed
            scale = 1
        }            
        else {
            speed = -this.bulletSpeed
            scale = -1
        }       
        bullet = context.physics.add.sprite(player.entity.x, player.entity.y + this.height, this.bulletSprite).setScale(playerScale*0.2*scale).setVelocityX(speed)
    
        //Adds colision between all zombies and the projectile (bullet) created
        for(let i = 0; i < zombies.length; i++) {
            context.physics.add.collider(bullet, zombies[i].entity, () => zombies[i].getHit(bullet), null, context)
        }    
    }
}