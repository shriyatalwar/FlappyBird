var Game_Over = {
    preload: function(){
        game.load.image('PLAY AGAIN', './assets/images/birdBig.png');
    },

    create: function(){
        game.stage.backgroundColor = '#71c5cf';
        this. bird = this.add.button(450, 450, 'PLAY AGAIN', this.startGame, this);
        this.animateBird();
        // var tween = game.tweens.add({
        //     targets: 'PLAY AGAIN',
        //     x: 400,               // '+=100'
        //     y: 300,               // '+=100'
        //     ease: 'Circ',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        //     duration: 1000,
        //     repeat: 0,            // -1: infinity
        //     yoyo: false
        // });
        this.add.text(350, 290, 'Last Level:', {font: "50px Arial", fill:"#000000"});
        this.add.text(610, 285, level.toString(), {font: "60px Arial", fill:"#000000"});
        this.add.text(350, 350, 'Last Score:', {font: "50px Arial", fill:"#000000"});
        this.add.text(610, 345, score.toString(), {font: "60px Arial", fill:"#000000"});
        this.add.text(250,100, 'GAME OVER!', {font: "80px Arial", fill:"#000000", align:"center"});
    },

    animateBird: function(){
        var animation = game.add.tween(this.bird);
        //change angle in 100ms
        animation.to({angle: 20}, 1000);
        animation.start();
        animation.loop(-1);
        if(this.bird.angle >= 10){
            this.bird.angle -= -20;
        }
        if(this.bird.angle <= -10){
            this.bird.angle += 20;
        }
    },

    startGame: function(){
        this.state.start('Menu');
    }
}