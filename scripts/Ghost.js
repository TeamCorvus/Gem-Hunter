var Ghost=(function(){

    function Ghost(x,y){
        this.position = new Vector2(x,y);
        this.movement={left:false, right:false,up:false, down:false};
        this.speed=0;
        this.isHit = false;


        this.width=32;
        this.height = 32;

        this.animation=new Animation(this.width, this.height, 2, 0 , 3,
            'images/ghost.png', 4, 3, 4);
        this.boundingBox = new Rectangle(x, y, this.width, this.height);
    };
    var i = 0;
    var rand = 0;
    Ghost.prototype.update = function() {
        if(this.isHit === false){
            if(i % 12 === 0){
                if(this.position.y >= 536){
                    this.position.y -= this.speed+32;
                }else if(this.position.y <= 128){
                    this.position.y += this.speed+32;
                }else if(this.position.x <= 64){
                    this.position.x += this.speed+32;
                }else if(this.position.x >= 736){
                    this.position.x -= this.speed+32;
                }else{
                    rand = Math.floor(Math.random() * (4 - 1) + 1);

                    switch(rand){
                        case 1:
                            var x=(Math.ceil((this.position.x + this.speed)/32));
                            var y=Math.ceil(this.position.y/32);
                            if(levelMap[x][y]){
                                this.position.x -= this.speed+32;
                            } else
                                this.position.x += this.speed+32; break;
                        case 2:
                            x=(Math.ceil((this.position.x - this.speed-32)/32));
                            y=Math.ceil(this.position.y/32);
                            if(levelMap[x][y]){
                                this.position.x += this.speed+32;
                            } else
                                this.position.x -= this.speed+32; break;
                        case 3:
                            x=(Math.ceil((this.position.x)/32));

                            y=Math.ceil((this.position.y+ this.speed)/32);
                            if(levelMap[x][y]){
                                this.position.y -= this.speed+32;
                            } else
                                this.position.y += this.speed+32; break;
                        case 4:
                            x=(Math.ceil((this.position.x)/32));

                            y=Math.ceil((this.position.y- this.speed-32)/32);
                            if(levelMap[x][y]){
                                this.position.y += this.speed+32;
                            } else
                                this.position.y -= this.speed+32; break;
                    }
                }
            }
        }
        i++;

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;

        this.animation.update();
    };

    Ghost.prototype.render=function(ctx){
        this.animation.draw(ctx)
    };

    return Ghost;
}());
