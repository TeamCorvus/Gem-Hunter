var Gem=(function(){

    function Gem(x,y){
        this.x=x;
        this.y=y;
        this.width=32;
        this.height = 32;
        this.position.set(x,y);
        this.animation=new Animation(this.width, this.height, 0, 0 , 6,
            'images/gems.png', 4, 6, 1);
        this.boundingBox = new Rectangle(x, y, this.width, this.height);
        this.animation.position.set(x, y);


        Gem.prototype.update = function() {

            this.animation.position.set(this.position.x, this.position.y);
            this.boundingBox.x = this.position.x;
            this.boundingBox.y = this.position.y;

            this.animation.update();
        };

    Gem.prototype.render=function(ctx){
        this.animation.draw(ctx)
    };
    return Gem;
}}());
