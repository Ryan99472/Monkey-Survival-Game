var monkey, monkey_running;
var invisibleGround;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var survivalTime = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.x = ground.width / 2
  console.log(ground.x);

  invisibleGround = createSprite(400, 350, 900, 10);
  invisibleGround.visible = true;

  FoodGroup = createGroup();
  obstacleGroup = createGroup();

}


function draw() {
  background(255);

  ground.velocityX = -8;

  if (keyDown("space") && monkey.y >= 160) {
    monkey.velocityY = -8;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  monkey.collide(invisibleGround);

  foods();

  obstacles();

  survival();

  drawSprites();
}

function foods() {
  if (World.frameCount % 80 === 0) {
    banana = createSprite(600, 120, 30, 30);
    banana.y = Math.round(random(120, 200));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (World.frameCount % 300 === 0) {
    obstacle = createSprite(600, 310, 40, 40);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}

function survival() {
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score, 500, 50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time:" + survivalTime, 100, 50);

}