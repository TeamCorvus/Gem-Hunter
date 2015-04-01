var renderlevel = function () {

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
        return renderLevel;

}();
