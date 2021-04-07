var back,backImg;

var stik,stik2,stik3,stik4,enimy,boss,pistol,uzi,nickey;

var stikWalk,stikFight,stikIdeal,stikPistol,enimyImage,bossImage,pistolImg,uziImg,nickeyImg;

var picture,invisibleGround,pistol;

var pic1,pic2,pic3,pic4;

var heart1;

var heartImg,gameover,restart;

var gameoverImg,restartImg;

var bullet = 0;
var score = 0;

var PLAY = 0;
var OVER = 1;
var END = 2;
var gameState = 0;

var bombsGroup,enimiesGroup,picturesGroup,pistolsGroup,uziesGroup;

function preload(){
	backImg = loadImage("other/back.png");

	pic1 = loadImage("pictures/PIC1.png");
	pic2 = loadImage("pictures/PIC2.png");
	pic3 = loadImage("pictures/PIC3.png");
	pic4 = loadImage("pictures/PIC4.png");

	gameoverImg = loadImage("other/gameover.png");
	restartImg = loadImage("other/restart.png");

	enimyImage = loadImage("other/E1.png");

	stikWalk = loadAnimation("walk/1.png","walk/2.png","walk/3.png","walk/4.png","walk/5.png","walk/6.png","walk/7.png","walk/8.png");

	stikFight = loadAnimation("fight/F1.png","fight/F2.png","fight/F3.png","fight/F4.png","fight/F5.png","fight/F6.png","fight/F7.png","fight/F8.png","fight/F9.png","fight/F10.png");

	stikPistol = loadAnimation("pistolStik/P1.png","pistolStik/P2.png","pistolStik/P3.png","pistolStik/P4.png","pistolStik/P5.png","pistolStik/P6.png","pistolStik/P7.png","pistolStik/P8.png",);

	stikIdeal = loadAnimation("other/I1.png");

	pistolImg = loadImage("guns/pistol.png");
	uziImg = loadImage("guns/uzi.png");

	heartImg = loadImage("other/heart.png");

	nickeyImg = loadImage("other/nickey.png");
}

function setup() {
	createCanvas(displayWidth,displayWidth);

	back = createSprite(displayWidth/2,displayHeight +285);
	back.addImage(backImg);

	invisibleGround = createSprite(displayWidth/2 -520,displayHeight +530,100000,20);
	invisibleGround.visible = false;

    stik = createSprite(displayWidth/2 -520,displayHeight +430,200,200);
	stik.addAnimation("walking",stikWalk);
	stik.addAnimation("stikPistol",stikPistol);
	stik.addAnimation("ideal",stikIdeal);
	stik.setCollider("rectangle",0,0,70,250,0)	
	stik.scale = 0.8;

	gameover = createSprite(displayWidth/2,displayHeight/2 +630);
	gameover.addImage(gameoverImg);
	gameover.scale = 0.6;

	restart = createSprite(displayWidth/2,displayHeight/2 +700);
	restart.addImage(restartImg);
	restart.scale = 0.6;

	heart1 = createSprite(displayWidth/2 -650 ,displayHeight/2 +400 );
	heart1.addImage(heartImg);
	heart1.scale = 0.05;

	score = 0;
	bullet = 0; 

	picturesGroup = new Group();
	pistolsGroup = new Group();
	uziesGroup = new Group();
	enimiesGroup = new Group();
}

function draw() {
	background("grey");

	textSize(17);
	fill("black");
	text("Distance: " + score, displayWidth / 2 + 530, displayHeight / 2 + 400);

	textSize(17);
	fill("black");
	text("Bullets: " + bullet, displayWidth / 2 + 530, displayHeight / 2 + 430);

	if (gameState === PLAY){

		score = score + Math.round(getFrameRate() / 140);

		heart1.visible = true

		gameover.visible = false

		restart.visible = false

		if (keyDown("space") && stik.y >= displayHeight/2 +750) {
			stik.velocityY = -22;
		}

		stik.velocityY = stik.velocityY +1;	
		
		if(pistolsGroup.isTouching(stik)){
		    ChangePistol();
		}

		if(uziesGroup.isTouching(stik)){
			changeUzi();
		}

		if(enimiesGroup.isTouching(stik)){
			enimiesGroup.destroyEach();
			gameState = OVER;
		}

		stik.collide(invisibleGround);

		spawnPistols();
		spawnPictures();	
		spawnUzies();
		spawnEnimies();
	}
	else if(gameState === OVER){

		gameover.visible = true
		restart.visible = true

		heart1.visible = false

		stik.changeAnimation("ideal",stikIdeal);

		picturesGroup.setVelocityXEach(0);
		pistolsGroup.setVelocityXEach(0);
		uziesGroup.setVelocityXEach(0);
		enimiesGroup.setVelocityXEach(0);

		picturesGroup.setLifetimeEach(-1);
		pistolsGroup.setLifetimeEach(-1);
		uziesGroup.setLifetimeEach(-1);
		enimiesGroup.setLifetimeEach(-1);

		if(mousePressedOver(restart)) {
		    reset();
		}
	}
	
  	drawSprites(); 
}

function reset(){
	gameState = PLAY;

	score = 0;
	bullet = 0;

	picturesGroup.destroyEach();
	uziesGroup.destroyEach();
	pistolsGroup.destroyEach();
	enimiesGroup.destroyEach();

	stik.changeAnimation("walking", stikWalk);
}

function ChangePistol(){
	stik.changeAnimation("stikPistol",stikPistol);
	pistolsGroup.destroyEach();
	bullet = 0;
	bullet += 10;
}

function changeUzi(){
	uziesGroup.destroyEach();
	bullet = 0;
	bullet += 30;	
}

function spawnPictures(){
	if (frameCount % 200 === 0){
		var picture = createSprite(displayWidth,displayHeight +150);
		picture.velocityX = -8.5;

		var rand = Math.round(random(1, 4));
		switch (rand) {
			case 1: picture.addImage(pic1);
				break;
			case 2: picture.addImage(pic2);
				break;
			case 3: picture.addImage(pic3);
				break;
			case 4: picture.addImage(pic4);
				break;
			default: break;
		}

		picture.scale = 0.5;
		picture.lifetime = 300;
		picture.depth = stik.depth -1;

		picturesGroup.add(picture);
	}
}

function spawnPistols(){
	if (frameCount % 1300 === 0) {
		 pistol = createSprite(displayWidth,displayHeight +400);
		pistol.velocityX = -8;
		pistol.addImage(pistolImg);

		pistol.scale = 0.1;
		pistol.lifetime = 300;

		pistol.depth = stik.depth;
		stik.depth = stik.depth + 1;

		pistolsGroup.add(pistol);
	}	
}

function spawnUzies() {
	if (frameCount % 2700 === 0) {
		var uzi = createSprite(displayWidth, displayHeight + 400);
		uzi.velocityX = -8;
		uzi.addImage(uziImg);

		uzi.scale = 0.1;
		uzi.lifetime = 300;

		uzi.depth = stik.depth;

		uziesGroup.add(uzi);
	}
}

function spawnEnimies(){
	if (frameCount % 500 === 0) {
		var enimy = createSprite(displayWidth,displayHeight +430);
		enimy.setCollider("rectangle",10,0,70,250,0);
		enimy.velocityX = -8;
		enimy.addImage(enimyImage);

		enimy.scale = 0.8;
		enimy.lifetime = 300;

		enimy.depth = stik.depth;

		enimiesGroup.add(enimy);
	}
}