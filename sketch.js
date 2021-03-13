var gamestate = 1
var play = 1
var end = 0
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var gameover, gameover1
var score = 0
var collected = 0
var ground

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameover1 = loadImage('game_over_PNG56.png')
}

function stones() {
  if (frameCount % 150 == 0) {
    obstacle = createSprite(700, 355, 20, 20)
   // obstacle.debug = true
    obstacle.setCollider("circle", 0 ,0 ,150)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.2
    obstacle.lifetime = 90
    obstacle.velocityX = ground.velocityX
    obstacleGroup.add(obstacle)
  }
}

function bananas() {
  if (frameCount % 70 == 0) {
    banana = createSprite(700, Math.round(random(200, 280)), 20, 20)
    banana.addImage(bananaImage)
    banana.scale = 0.12
    banana.lifetime = 90
    banana.velocityX = ground.velocityX
    FoodGroup.add(banana)
  }
}


function setup() {
  createCanvas(500, 500);
  ground = createSprite(400, 400, 1200, 20)
  monkey = createSprite(80, 355, 20, 20)
  gameover = createSprite(250, 250, 20, 20)

  monkey.addAnimation('a', monkey_running)
  monkey.scale = 0.1
  FoodGroup = new Group()
  obstacleGroup = new Group()
}

function draw() {
  textSize(20)
  background("white")
  text('Score:' + score, 10, 20)

  text("Bananas collected:" + collected, 10, 40)
  //ground.debug = true
  ground.depth = 1
  if (gamestate === play) {
    ground.velocityX = -10

    //console.log(monkey.y)
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && monkey.y >= 359.2) {
      monkey.velocityY = -17
    }

    monkey.velocityY = monkey.velocityY + 1
    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach()
      collected = collected + 1
    }
    if (monkey.isTouching(obstacleGroup)) {
      gamestate = end
    }
    gameover.visible = false

    score = Math.floor(frameCount / 5)
    monkey.collide(ground)
    stones()
    bananas()

  } else if (gamestate === end) {
    gameover.visible = true
    gameover.addImage(gameover1)
    banana.destroy()
    obstacle.destroy()
    monkey.destroy()
    ground.destroy()
    gameover.scale = 0.7
  }
  drawSprites();
}