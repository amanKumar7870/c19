var thief,thiefImage;
var police,policeImage;

var city,cityImage;
var ground,groundImage;
var park;
var bullet,bulletImage;
var PLAY=0;
var END=1;
var gameState=PLAY;

var heart,heartImage,heart1,heart2;
var life;
var bulletGroup;
var endPolice,endThief;
var thiefCatch,catchImage;
var score;
var fire;
var heartBreak;
var game;

function preload(){
thiefImage=loadAnimation('thief1.png','thief2.png');
  

  policeImage=loadAnimation('police run1.png','police run2.png');
  
  cityImage=loadImage('city.jpg');
  groundImage=loadImage('a.png');
  
  bulletImage=loadImage('bullet.png');
  
  heartImage=loadImage('heart.png');
  
  endPolice=loadAnimation('police run1.png');
  endThief=loadAnimation('thief1.png');
  
  catchImage=loadImage('hhh.png');
  
  fire=loadSound('cannon-soundbible_5xh1Wvy.mp3');

  heartBreak=loadSound('light-bulb-breaking-soundbible.mp3');
  
  game=loadSound('gta-san-andreas-.mp3');
}

function setup() {
  createCanvas(600,300);
  
  city=createSprite(300,100,10,10);
  city.addImage(cityImage);
  city.scale=1.5

  ground=createSprite(300,270,10,10);
  ground.addImage(groundImage);
  
  thief=createSprite(400,250,10,1);
 thief.addAnimation('run',thiefImage);
  thief.scale=0.3
  thief.debug=false; 
  thief.setCollider('rectangle',0,0,thief.width,thief.height);
  
  police=createSprite(50,250,10,10);
  police.addAnimation('walk',policeImage);
  police.scale=0.3

  
  park=createSprite(300,290,700,10);
  park.visible=false;
  
  life=3;
  score=0;
  
  bulletGroup=createGroup();
  
  heart=createSprite(10,10,10,10);
  heart.addImage(heartImage);
  heart.scale=0.5
  
  heart1=createSprite(35,10,10,10);
  heart1.addImage(heartImage);
  heart1.scale=0.5
  
  heart2=createSprite(60,10,10,10);
  heart2.addImage(heartImage);
  heart2.scale=0.5
  
    thiefCatch=createSprite(300,150,10,10);
    thiefCatch.addImage(catchImage);
      thiefCatch.scale=0.1;
  thiefCatch.visible=false;
 
  game.loop();
}

function draw() {
  background(220);
  
  if(gameState===PLAY){
    city.velocityX=-(4+score/300); 
    
    if(getFrameRate()/1){
      score=score+1;
    }
    
    
    if(city.x<150){
 city.x=city.width/2;
      }
    
    
      if(touches.length<0  ||  keyDown('space')  &&thief.y>200){
   thief.velocityY=-10;
    touches=[];
  }
    
      if(frameCount%100===0){
    
  bullet=createSprite(police.x+20  ,police.y-15,0,0);
  bullet.addImage(bulletImage);
    bullet.velocityX=(11+score/400);
    bullet.scale=0.1
    bullet.lifetime=100;
        fire.play();
        bulletGroup.add(bullet);
  }
    
    
    if(bulletGroup.isTouching(thief)&& life===3){
      life=2;
      heart2.destroy();
      bulletGroup[0].destroy();
      heartBreak.play();
      
    }
    
    
    if(bulletGroup.isTouching(thief)&& life===2){
      life=1;
      heart1.destroy();
        bulletGroup[0].destroy();
      heartBreak.play();
    }
    
    game.setVolume(1);
    
     if(bulletGroup.isTouching(thief)&& life===1){
      life=0;
      heart.destroy();     
       gameState=END;
      heartBreak.play();
    }
    
    
  }
  else 
    if(gameState===END){
    
    police.addAnimation('walk',endPolice);
    thief.addAnimation('run',endThief);
      
   city.velocityX=0;
   bulletGroup.setVelocityXEach(0);  
   bulletGroup.setLifetimeEach(-1);
      
      
      thiefCatch.visible=true;
  
      
      if(touches.lenght<0 || mousePressedOver(thiefCatch)){
        touches=[];
        gameState=PLAY;
        reset();
      }
    game.setVolume(0);
  }
 
 thief.velocityY=thief.velocityY+1;
  
  thief.collide(park);
  police.collide(park);
  
  drawSprites();
 
  fill('white')
  text('LIFE:'+life,540,10);
  
  text('SCORE:'+score,260,10);
}

function reset(){

  bulletGroup.destroyEach();
  thief.addAnimation('run',thiefImage);
  police.addAnimation('walk',policeImage);
  
  thiefCatch.visible=false;
  
  life=3;
  score=0;
  
   heart=createSprite(10,10,10,10);
  heart.addImage(heartImage);
  heart.scale=0.5
  
  heart1=createSprite(35,10,10,10);
  heart1.addImage(heartImage);
  heart1.scale=0.5
  
  heart2=createSprite(60,10,10,10);
  heart2.addImage(heartImage);
  heart2.scale=0.5
  
  
  
}