namespace SpriteKind {
    export const escalera = SpriteKind.create()
    export const enemy_projectile = SpriteKind.create()
}
controller.player2.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
    Ataque = sprites.createProjectileFromSprite(assets.image`Cuchillo abajo`, Tommy, 0, 200)
    Ataque.setScale(0.2, ScaleAnchor.Middle)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairNorth, function (sprite, location) {
    if (lvl_up == 1) {
        tiles.setCurrentTilemap(tilemap`nivel3`)
        tiles.placeOnTile(Tommy, tiles.getTileLocation(15, 8))
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        Tommy.sayText("Un pou?")
    }
})
sprites.onOverlap(SpriteKind.enemy_projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
    pause(2000)
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    Ataque = sprites.createProjectileFromSprite(assets.image`Cuchillo izquierda`, Tommy, -200, 0)
    Ataque.setScale(0.2, ScaleAnchor.Middle)
    Tommy.setImage(assets.image`myImage2`)
})
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    Ataque = sprites.createProjectileFromSprite(assets.image`Cuchillo arriba`, Tommy, 0, -200)
    Ataque.setScale(0.2, ScaleAnchor.Middle)
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(1)
    Tommy.sayText("")
})
info.onScore(10, function () {
    lvl_up = 1
    Tommy.sayText("¡POR LAS ESCALERAS!")
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    tiles.setTileAt(location, sprites.dungeon.chestOpen)
    Inicio = false
    Tommy.sayText("Noooo Goblins")
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    pause(2000)
})
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.confetti)
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass2, function (sprite, location) {
    game.gameOver(true)
    game.setGameOverEffect(true, effects.confetti)
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    Ataque = sprites.createProjectileFromSprite(assets.image`Cuchillo derecha`, Tommy, 200, 0)
    Ataque.setScale(0.2, ScaleAnchor.Middle)
    Tommy.setImage(assets.image`myImage0`)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairLarge, function (sprite, location) {
    while (Final_battle == 0) {
        Po = sprites.create(assets.image`Po`, SpriteKind.Enemy)
        Boss_Bar = statusbars.create(50, 9, StatusBarKind.EnemyHealth)
        Boss_Bar.attachToSprite(Po)
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Po).max = 50
        tiles.placeOnRandomTile(Po, sprites.dungeon.collectibleInsignia)
        Final_battle = 1
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -1
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value <= 0) {
        sprites.destroy(otherSprite)
        info.changeScoreBy(1)
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    if (Boss_Bar.value == 0) {
        tiles.setCurrentTilemap(tilemap`nivel4`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.enemy_projectile)
        Tommy.sayText("Al fin libre")
    }
})
let Taco: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let goblin: Sprite = null
let Boss_Bar: StatusBarSprite = null
let Po: Sprite = null
let Ataque: Sprite = null
let Tommy: Sprite = null
let lvl_up = 0
let Inicio = false
let Final_battle = 0
game.splash("He de salir de aquí")
game.splash("Tal vez....")
game.splash("El cofre tenga ", "la salida")
Final_battle = 0
Inicio = true
lvl_up = 0
scene.setBackgroundImage(assets.image`fondo`)
tiles.setCurrentTilemap(tilemap`nivel`)
Tommy = sprites.create(assets.image`myImage0`, SpriteKind.Player)
tiles.placeOnRandomTile(Tommy, assets.tile`transparency16`)
scene.cameraFollowSprite(Tommy)
controller.moveSprite(Tommy, 100, 100)
info.setLife(3)
Tommy.sayText("Menos mal que tengo esta cantidad infinita ", 2000, false)
pause(2000)
Tommy.sayText("de cuchillos arrojadizos", 1000, false)
pause(1000)
Tommy.sayText("(jikl para lanzarlos)", 2000, false)
game.onUpdateInterval(2000, function () {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(7, 15), sprites.dungeon.stairNorth) && Inicio != true) {
        goblin = sprites.create(assets.image`Goblin`, SpriteKind.Enemy)
        statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        statusbar.attachToSprite(goblin)
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, goblin).max = 3
        tiles.placeOnRandomTile(goblin, sprites.dungeon.floorDark0)
        goblin.follow(Tommy, 50)
    }
})
forever(function () {
    if (Final_battle == 1) {
        if (Boss_Bar.value > 0) {
            projectile = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 9 9 . . . . . . . 
                . . . . . . 9 5 9 9 . . . . . . 
                . . . . . 9 5 5 5 9 . . . . . . 
                . . . . . 9 5 1 5 9 9 . . . . . 
                . . . . 9 5 5 1 5 5 9 . . . . . 
                . . . 9 5 5 1 1 1 5 5 9 . . . . 
                . . . 9 5 1 1 1 1 1 5 9 9 . . . 
                . . 9 5 5 1 1 1 1 1 1 5 9 . . . 
                . . 9 5 1 1 1 1 1 1 1 5 5 9 . . 
                . 9 5 5 1 1 1 1 1 1 1 1 5 9 9 . 
                . 9 5 1 1 1 1 1 1 1 1 1 5 5 9 . 
                9 9 5 1 1 1 1 1 1 1 1 1 1 5 9 . 
                9 5 5 5 5 5 5 5 5 5 5 5 5 5 5 9 
                9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
                `, SpriteKind.enemy_projectile)
            projectile.x = Po.x
            projectile.y = Po.y
            projectile.follow(Tommy, 75)
            pause(2000)
            sprites.destroyAllSpritesOfKind(SpriteKind.enemy_projectile)
        }
    }
})
game.onUpdateInterval(10000, function () {
    if (Inicio != true) {
        Taco = sprites.create(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................eee.............
            ..............e562e6............
            .............474477677..........
            ...........452763245dd8.........
            ...........6754745dd54d.........
            ..........4547655545555.........
            .........e5eee555555ddd.........
            .........ee4e4d55555dd..........
            .........efff5555ddde...........
            .........eeefd555de.............
            ..........4ffd55de..............
            ...........e5dde................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            `, SpriteKind.Food)
        tiles.placeOnRandomTile(Taco, sprites.dungeon.floorDark0)
        Tommy.sayText("Ostia, un taco")
    }
})
