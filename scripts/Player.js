var Player=(function(){

    function Player(x,y){
            this.position = new Vector2(x,y);
            this.movement={left:false, right:false,up:false, down:false};
            this.speed=2;

            this.width=32;
            this.height = 32;

            this.animation=new Animation(this.width, this.height, 0, 0 , 1,
                                         './images/hero-sprite.png', 9, 4, 4);
            this.boundingBox = new Rectangle(x, y, this.width, this.height);
        };

    Player.prototype.update = function() {
        if(this.movement.right) {
            this.position.x += this.speed;
        } else if(this.movement.left) {
            this.position.x -= this.speed;
        }

        if(this.movement.up) {
            this.position.y -= this.speed;
        } else if(this.movement.down) {
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
