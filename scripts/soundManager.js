var gameSound = function(url, loop) {
    this.loop = loop;
    this.song = new Audio(url);
};

gameSound.prototype.playSound = function() {
    if (this.loop) {
        this.song.addEventListener('ended', function() {
            this.play();
        }, false);
    }
    this.song.play();
};

//TODO...PAUSE STOP ETC...