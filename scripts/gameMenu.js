/*
    MENU DEV STATE
*/

function loadMenu(ctx) {
    window.addEventListener("load", loadMenuBackground, true);

    function loadMenuBackground(){
        var menuBGImage = new Image();
        menuBGImage.src = './images/background.png';
        menuBGImage.onload = function() {
            ctx.drawImage(menuBGImage, 0, 0);

            ctx.font = '30px Times New Roman';
            ctx.fillStyle = '#FFF';
            ctx.fillText('MENU', canvas.width / 2.35, canvas.height / 3.6);

            //TEST
            var newGame = false;
            var newGameBox;
            var newGameItem = 'New Game';

            function menuItems() {
                newGameBox = {
                    x: 320,
                    y: 200,
                    w: 0,
                    h: 28
                };
                ctx.fillText(newGameItem, newGameBox.x, newGameBox.y + 20);
                newGameBox.w = ctx.measureText(newGameItem).width;
            }
            menuItems();

            canvas.addEventListener('click', checkStart, false);

            function checkStart(e) {
                var p = getMousePos(e);

                if (p.x >= newGameBox.x && p.x <= newGameBox.x + newGameBox.w &&
                    p.y >= newGameBox.y && p.y <= newGameBox.y + newGameBox.h) {

                    newGame = !newGame;
                    if (newGame === true) {
                        startGame();
                    } else {
                        menuItems();
                    }
                }
            }

            function getMousePos(e) {
                var r = canvas.getBoundingClientRect();
                return {
                    x: e.clientX - r.left,
                    y: e.clientY - r.top
                };
            }
        };
    }
}