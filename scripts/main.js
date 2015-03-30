
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

var input = new Input();
attachListeners(input);

var levelMap = [];
var col = canvas.width/32-1;
var row = canvas.height/32-1;
var level = 0.2;

    for(var x = 0; x <= col; x++) {
        levelMap[x] = [];
        for (var y = 0; y <= row; y++) {
            levelMap[x][y] = false;
        }
    }

    for (x = 2; x < col; x += 1) {
        for (y = 3; y < row; y += 1) {
            levelMap[x][y] = Math.round((Math.random()-level));
        }
    }

//Initialise player on position x = 50, y = 50.
var hero = new Player(32, 64);


//var soldier = new Animation(32, 32, 3,0,9, 'resources/soldier.png', 8, 9, 4);
//var flower = new Animation(25, 32, 3,0,3, 'resources/flower.png', 4, 3, 4);


    //hero.position.set(50,50);
//   flower.position.set(150,150);
    function update(){
        this.tick();
        renderLevel(3);
        this.render(ctx);
        requestAnimationFrame(update);
    }

    function tick (){
        hero.update();
        movePlayer();
//        soldier.update();
//        flower.update();



    }

    function render(ctx){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        renderLevel(3);

        hero.render(ctx);
//        soldier.draw(ctx);
//        flower.draw(ctx);


    }

    function renderLevel(lvl) {

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


update();