var Player=(function(){

    function Player(x,y){
            this.position = new Vector2(x,y);
            this.movement={left:false, right:false,up:false, down:false};
            this.speed=4;

            this.width=32;
            this.height = 32;

            this.animation=new Animation(this.width, this.height, 0, 0 , 3,
                                         'images/hero-sprite.png', 4, 4, 4);
            this.boundingBox = new Rectangle(x, y, this.width, this.height);
        }

    Player.prototype.update = function() {
        if(this.movement.right) {

            var x=(Math.ceil((this.position.x + this.speed/2)/32));
            var y=Math.ceil(this.position.y/32);
            if(levelMap[x][y]){
                this.position.x=this.position.x;
                this.position.y=this.position.y;
            } else
            this.position.x += this.speed;

        } else if(this.movement.left) {

             x=(Math.ceil((this.position.x - this.speed/2-32)/32));
             y=Math.ceil(this.position.y/32);
            if(levelMap[x][y]){
                this.position.x=this.position.x;
                this.position.y=this.position.y;
            } else

            this.position.x -= this.speed;
        }

        if(this.movement.up) {
            x=(Math.ceil((this.position.x)/32));

            y=Math.ceil((this.position.y- this.speed/2-32)/32);
            if(levelMap[x][y]){
                this.position.x=this.position.x;
                this.position.y=this.position.y;
            } else
            this.position.y -= this.speed;
        } else if(this.movement.down) {
            x=(Math.ceil((this.position.x)/32));

            y=Math.ceil((this.position.y+ this.speed/2)/32);
            if(levelMap[x][y]){
                this.position.x=this.position.x;
                this.position.y=this.position.y;
            } else
            this.position.y += this.speed;
        }

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;

        this.animation.update();
    };

    Player.prototype.render=function(ctx){
        this.animation.draw(ctx)
    };

    return Player;
}());
