/*
 MENU DEV STATE
 */

function loadMenu(ctx) {

    var menuBGSound = new gameSound('media/menuBGSound.mp3', true);
    menuBGSound.playSound();


    window.addEventListener("load", loadMenuBackground, true);

    function loadMenuBackground() {
        var menuBGImage = new Image();
        menuBGImage.src = './images/menuBG.jpg';
        menuBGImage.onload = function () {
            ctx.drawImage(menuBGImage, 0, 0);

            ctx.font = '30px Times New Roman';
            ctx.strokeStyle = '#FFF';
            ctx.strokeText('MENU', canvas.width / 2.25, canvas.height / 3.5);
            ctx.fillStyle = '#090';
            ctx.fillText('MENU', canvas.width / 2.25, canvas.height / 3.5);

            var newGameSelected = false,
                newGameBBox,
                newGameItem = 'New Game',
                creditsSelected,
                creditsBBox,
                creditsItem = 'Credits';

            function menuItems() {
                newGameBBox = {
                    x: 330,
                    y: 200,
                    w: 0,
                    h: 28
                };

                ctx.fillStyle = '#FFF';
                ctx.fillText(newGameItem, newGameBBox.x, newGameBBox.y + 20);
                newGameBBox.w = ctx.measureText(newGameItem).width;

                creditsBBox = {
                    x: 355,
                    y: 240,
                    w: 0,
                    h: 28
                };

                ctx.fillText(creditsItem, creditsBBox.x, creditsBBox.y + 20);
                creditsBBox.w = ctx.measureText(creditsItem).width;
            }

            menuItems();
            var selectedSound = new gameSound('media/selected.wav', false);

            canvas.addEventListener('click', checkSelection, false);
            var menuIsEnabled = true;

            function checkSelection(event) {
                var p = getMousePos(event);

                if (p.x >= newGameBBox.x && p.x <= newGameBBox.x + newGameBBox.w &&
                    p.y >= newGameBBox.y && p.y <= newGameBBox.y + newGameBBox.h) {

                    newGameSelected = !newGameSelected;
                    if (newGameSelected && menuIsEnabled) {
                        menuIsEnabled = false;
                        selectedSound.playSound();
                        startGame();
                    } else {
                        menuItems();
                    }
                }
                if (p.x >= creditsBBox.x && p.x <= creditsBBox.x + creditsBBox.w &&
                    p.y >= creditsBBox.y && p.y <= creditsBBox.y + creditsBBox.h) {

                    creditsSelected = !creditsSelected;
                    if (creditsSelected && menuIsEnabled) {
                        selectedSound.playSound();
                        var textPosX = 240,
                            textPosY = 300;

                        var devNames = ['Dimitar Dimitrov', 'Ivan Nikolov', 'Svetlin Yotov', 'Veselin Hristov'];
                        devNames.forEach(function (name) {
                            ctx.font = '40px Consolas';
                            ctx.fillText('<' + name + '>', textPosX, textPosY += 60);
                            ctx.strokeStyle = '#000';
                            ctx.strokeText('<' + name + '>', textPosX, textPosY);
                        });
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