var path,boy,invisibleLeft,invisibleRight;
var waterBar,waterLevel;
var pathImg,boyImg,coinImg,waterImg,boyStanding;
var coin,totalCoins;
var water;
var box, box2;
var number,number2;
var velocity;
var gameState = 1;
var i;

function preload(){
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  boyStanding = loadAnimation("Runner-1.png")
  coinImg = loadImage("coin.png");
  waterImg = loadImage("energyDrink.png");
  number = Math.round(random(1,3));
  number2 = Math.round(random(1,3));
  totalCoins = 0;
  velocity = 4;
}

function setup(){
  
  createCanvas(400,400);
  
// Moving background
path = createSprite(200,200);
path.addImage(pathImg);
path.velocityY = velocity;
path.scale=1.2;

//creating boy running
boy = createSprite(180,340,30,30);
boy.scale = 0.2;
boy.addAnimation("JakeRunning",boyImg);
boy.addAnimation("JakeStanding",boyStanding)

invisibleLeft = createSprite(0,0,100,800);
invisibleLeft.visible = false;


invisibleRight = createSprite(410,0,100,800);
invisibleRight.visible = false;

coin = createSprite((width/4)*number,-40,40,40);
coin.addImage(coinImg);
coin.scale = 0.4;

water = createSprite((width/4)*number2,-2000,40,40);
water.addImage(waterImg);
water.scale = 0.15;

box = createSprite(300,20,108,28); 
box.shapeColor = ("#ffffff")

box2 = createSprite(300,20,100,20);
box2.shapeColor = ("#000000");

waterBar = createSprite(300,20,100,20);
waterBar.shapeColor = ("#24daf2");

waterLevel = 100;
}

function newCoin(){
  number = Math.round(random(1,3));
  coin = createSprite((width/4)*number,-40,40,40);
  coin.addImage(coinImg);
  coin.scale = 0.4;
}

function newWater(){
  number2 = Math.round(random(1,3));
  water = createSprite((width/4)*number2,-2000,40,40);
  water.addImage(waterImg);
  water.scale = 0.2;
}

function velocityIncrease(){
  if(velocity <= 20){
    velocity += 0.5;
  }
}

function draw() {
  background(0);
  path.velocityY = velocity;
  coin.velocityY = velocity;
  water.velocityY = velocity;

  if(gameState === 1){
  
  boy.x = World.mouseX;

  if(waterLevel > 0){
  waterLevel -= velocity/30;
  waterBar.width = waterLevel;
  waterBar.x -= velocity/60; }else if(waterLevel <= 0){
    gameState = 0;
  }
  
  edges= createEdgeSprites();
  boy.collide(edges[3]);
  boy.collide(invisibleLeft);
  boy.collide(invisibleRight);
  
  //code to reset the background
  if(path.y > 400 ){
  path.y = height/2;}

  //Coin 
  if(boy.collide(coin)){
    coin.destroy(); 
    totalCoins++;
    newCoin();
    velocityIncrease();
  }
  if(coin.y > 400){
    newCoin();
  }
  if(boy.collide(water)){
    water.destroy(); 
    waterLevel = 100;
    waterBar.x = 300; 
    newWater();
    velocityIncrease(); 
  }
  if(water.y > 400){
    newWater();
  }}

  coin.depth = box.depth - 1;
  water.depth = box.depth - 1;
  
  drawSprites();

  if(gameState === 0){
    textSize(50);
    fill(255,0,0);
    textFont("Impact");
    text("Game Over",100,100,400,400)
    velocity = 0;
    boy.changeAnimation("JakeStanding",boyStanding);
  }

  fill("white");
  textSize(20);
  textFont("Arial");
  text("Coins: " + totalCoins,50,10,400,400);
}
