// Create the canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// Background image
var bgImage;
bgImage = new Image();
var bgReady = true;
bgImage.src = "images/background.png";

// Border image

var borderImage = new Image();
var borderReady = true;

borderImage.src = "images/tree.png";

// Obstacle imagee
var obsImage = new Image();
var obsReady = true;
obsImage.src = "images/bush.png";

var levelMap = [];
var col = canvas.width/32-1;
var row = canvas.height/32-1;
var level = 0.3;

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

// (levelMap);
function renderBG() {

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
    if (obsReady){
        for (x = 2; x < col; x += 1) {
            for ( y = 3; y < row; y += 1) {
                if (levelMap[x][y]) {
                    ctx.drawImage(obsImage, x * 32, y * 32);
                }
            }
        }
    }

}


// Draw everything
var render = function () {

    ctx.clearRect(0,0,800,600);
    renderBG();


    // Score
    ctx.fillStyle = "rgb(50, 150, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Gems Collected: " + gemCollected, 32, 0);
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play game!
var then = Date.now();
render();


main();