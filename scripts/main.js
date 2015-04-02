
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var input = new Input();
attachListeners(input);

//FULL SCREEN FUNC
function fullScreen() {
    if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
    }
    else {
        canvas.mozRequestFullScreen();
    }
}
//FULL SCREEN
canvas.addEventListener("dblclick", fullScreen);

//MENU
loadMenu(ctx);

//SOUNDS
var gemColectedSound = new gameSound('media/gemCollected.wav', false),
    chaserHited = new gameSound('media/chaserHited.wav', false);

var levelMap = [];
var col = Math.floor(canvas.width/32)-1;
var row = Math.round(canvas.height/32)-1;
var level = 1;
var diff = 0.2;

for(var x = 0; x <= col; x++) {
    levelMap[x] = [];
    for (var y = 0; y <= row; y++) {
        levelMap[x][y] = false;
    }
}

for (x = 2; x < col; x += 1) {
    for (y = 3; y < row; y += 1) {
        levelMap[x][y] = Math.round((Math.random()-diff));
    }
}

//Initialise resources
var hero = new Player(32, 64);
var heroLifes = 5;
var chaser = new Chaser(160, 160);
var points = 0;

function randomPosition(){
    var a=1+Math.floor((Math.random() * (canvas.width/32 - 2)));
    var b=2+Math.floor((Math.random() * (canvas.height/32 - 3)));

    if (levelMap[a][b]){
        randomPosition();
    }
    return {x:a*32, y:b*32};

}

var rand = (randomPosition());

//var gem = new Animation(32,32, 0, 0 , 6,
//    'images/gems.png',12, 6, 1);
//gem.position.set(rand.x,rand.y);

var gemV = new Gem(rand.x, rand.y);

function update(){
    this.tick();
    renderLevel(level);
    this.render(ctx);
    updateScore();
    requestAnimationFrame(update);
}

function tick (){
    chaser.isHitObs = false;
    hero.update();
    chaser.update();
    movePlayer();
    gemV.update();


    if(hero.boundingBox.intersects(chaser.boundingBox)) {
        chaser.isHit = true;
        chaserHited.playSound();
        //when the chaser hits the hero
    }

    //HERO LIFE LEFT
    if (chaser.isHit) {
        heroLifes -= 1;
        chaser.isHit = false;
        hero.position.set(32,64);
    }

    if(hero.boundingBox.intersects(gemV.boundingBox)) {
        gemColectedSound.playSound();
        points += 1;
        gemV = {};
        gemV = new Gem(randomPosition().x, randomPosition().y);
        chaser.speed += 1;
        if(points>=level*5){
            level+=1;
            diff-=0.05;
            hero.position.set(32,64);

        }
    }

}

function updateScore() {
    ctx.fillStlye = "white";
    ctx.font = "20px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + points, 20, 10 );
}

function updateLifes() {
    ctx.fillStlye = "white";
    ctx.font = "20px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Life: " + heroLifes, canvas.width - 100, 10 );
}

function render(ctx){
    //IF HERO LIFE IS GREATER THAN 0
    if (heroLifes > 0) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        renderLevel(level);
        hero.render(ctx);
        chaser.render(ctx);
        updateScore(ctx);
        updateLifes();
        gemV.render(ctx);
    } else {
        //TODO...ADD START AGAIN SCREEN
    }
}
function  renderLevel(lvl) {

    var bgImage = new Image();
    var borderImage = new Image();
    var obsImage = new Image();

    switch (lvl) {

        case 1:
        {
            bgImage.src = "images/background1.jpg";
            obsImage.src = "images/bush.png";
            borderImage.src = "images/tree.png";
        }
            break;

        case 2:
        {
            bgImage.src = "images/background2.jpg";
            obsImage.src = "images/crater.png";
            borderImage.src = "images/brick.png";
        }
            break;

        case 3:
        {
            bgImage.src = "images/background3.jpg";
            obsImage.src = "images/icecrystal.png";
            borderImage.src = "images/iceblock.png";
        }
            break;
    }

    var bgReady = true;
    var borderReady = true;
    var obsReady = true;


    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (borderReady) {
        for (var x = 0; x <= col; x += 1) {
            ctx.drawImage(borderImage, x * 32, 32);
            ctx.drawImage(borderImage, x * 32, row * 32);
            levelMap[x][1] = true;
            levelMap[x][row] = true;
        }
        for (var y = 1; y <= row; y += 1) {
            ctx.drawImage(borderImage, 0, y * 32);
            ctx.drawImage(borderImage, col * 32, y * 32);
            levelMap[0][y] = true;
            levelMap[col][y] = true;
        }
    }
    if (obsReady) {
        for (x = 2; x < col; x += 1) {
            for (y = 3; y < row; y += 1) {
                if (levelMap[x][y]) {
                    ctx.drawImage(obsImage, x * 32, y * 32);
                }
            }
        }
    }
}


function movePlayer() {
    hero.movement.right = !!input.right;
    hero.movement.left = !!input.left;
    hero.movement.up = !!input.up;
    hero.movement.down = !!input.down;

}


// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play game!
function startGame() {
    update();
}