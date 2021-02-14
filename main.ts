namespace SpriteKind {
    export const Damage = SpriteKind.create()
    export const DamagePlayer = SpriteKind.create()
    export const Bullet = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.pewPew.play()
    bullet = sprites.createProjectileFromSprite(img`
        . . . . . 
        . 5 2 5 . 
        . 2 4 2 . 
        . 5 2 5 . 
        . . . . . 
        `, mySprite, 50, 0)
    bullet.setKind(SpriteKind.Bullet)
})
function checkDamage () {
    if (mySprite.kind() == SpriteKind.Player) {
        music.powerDown.play()
        info.changeLifeBy(-1)
        mySprite.setKind(SpriteKind.DamagePlayer)
        mySprite.lifespan = 1500
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 5 2 2 2 e . . . . 
            . . . . . 2 2 2 2 5 2 2 e . . . 
            . . . . e 2 5 2 2 2 2 2 5 . . . 
            . . . . e 2 2 2 2 2 5 2 e . . . 
            . . . . e 2 2 2 5 2 e f f c c . 
            . . . . e e 5 2 e f f f 5 b c . 
            . . e 5 e f e 2 2 b f f f d 5 . 
            . 5 e 2 2 d f e 5 1 1 5 1 b c . 
            . e e 2 5 d f e e e c c c . . . 
            . b 1 1 e e 2 2 e 5 c . . . . . 
            . . f d d 5 2 5 f f f d d . . . 
            e e f 5 d e e e . f 5 d 5 . . . 
            5 e e f f f 5 f . . . . . . . . 
            e e . . . . f f f . . . . . . . 
            . . . . . . 5 f f 5 . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 2 2 2 2 e . . . . 
            . . . . . 2 2 2 2 d 2 2 e . . . 
            . . . . e 2 2 2 2 2 2 2 e . . . 
            . . . . e 2 2 2 2 2 2 2 e . . . 
            . . . . e 2 2 2 2 2 e f f c c . 
            . . . . e e 2 2 e f f f f b c . 
            . . e e e f e 2 2 b f f f d c . 
            . e e 2 2 d f e 2 1 1 1 1 b c . 
            . e e 2 2 d f e e e c c c . . . 
            . b 1 1 e e 2 2 e e c . . . . . 
            . . f d d 2 2 2 f f f d d . . . 
            e e f d d e e e . f f d d . . . 
            e e e f f f f f . . . . . . . . 
            e e . . . . f f f . . . . . . . 
            . . . . . . f f f f . . . . . . 
            `],
        100,
        true
        )
    }
}
sprites.onOverlap(SpriteKind.Bullet, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprite.destroy()
    otherSprite.destroy()
    music.baDing.play()
    if (info.score() % 10 == 0) {
        info.changeLifeBy(1)
        music.powerUp.play()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    checkDamage()
})
sprites.onDestroyed(SpriteKind.DamagePlayer, function (sprite) {
    createPlayer()
    mySprite.setPosition(sprite.x, sprite.y)
})
function createPlayer () {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 2 e . . . . 
        . . . . . 2 2 2 2 d 2 2 e . . . 
        . . . . e 2 2 2 2 2 2 2 e . . . 
        . . . . e 2 2 2 2 2 2 2 e . . . 
        . . . . e 2 2 2 2 2 e f f c c . 
        . . . . e e 2 2 e f f f f b c . 
        . . e e e f e 2 2 b f f f d c . 
        . e e 2 2 d f e 2 1 1 1 1 b c . 
        . e e 2 2 d f e e e c c c . . . 
        . b 1 1 e e 2 2 e e c . . . . . 
        . . f d d 2 2 2 f f f d d . . . 
        e e f d d e e e . f f d d . . . 
        e e e f f f f f . . . . . . . . 
        e e . . . . f f f . . . . . . . 
        . . . . . . f f f f . . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(mySprite, 0, 100)
}
let projectile: Sprite = null
let bullet: Sprite = null
let mySprite: Sprite = null
info.setScore(0)
createPlayer()
mySprite.setPosition(30, 60)
scene.setBackgroundColor(8)
effects.starField.startScreenEffect()
info.setLife(3)
game.onUpdateInterval(1000, function () {
    projectile = sprites.createProjectileFromSide(img`
        . . . . . . . c c c a c . . . . 
        . . c c b b b a c a a a c . . . 
        . c c a b a c b a a a b c c . . 
        . c a b c f f f b a b b b a . . 
        . c a c f f f 8 a b b b b b a . 
        . c a 8 f f 8 c a b b b b b a . 
        c c c a c c c c a b c f a b c c 
        c c a a a c c c a c f f c b b a 
        c c a b 6 a c c a f f c c b b a 
        c a b c 8 6 c c a a a b b c b c 
        c a c f f a c c a f a c c c b . 
        c a 8 f c c b a f f c b c c c . 
        . c b c c c c b f c a b b a c . 
        . . a b b b b b b b b b b b c . 
        . . . c c c c b b b b b c c . . 
        . . . . . . . . c b b c . . . . 
        `, randint(-30, -80), 0)
    projectile.y = randint(0, scene.screenHeight())
})
