var diffBetweenPipes = 100, heightOfFrame = 681, heightOfPipe = 400;
var score, level;
var Game = {
    preload: function(){
        game.load.image('bird', './assets/images/bird2.png');
        game.load.image('pipe', './assets/images/pipe.png');
        game.load.image('pipeUp', './assets/images/pipe4.png');
        game.load.image('pipeDown', './assets/images/pipe3.png');
        game.load.audio('jump', './assets/sound/jump.wav');
    },

    create: function(){
        score = 0;
        level = 1;
        game.stage.backgroundColor = '#71c5cf';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = game.add.sprite(100, 245, 'bird');
        this.pipes = game.add.group();
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 900;
        // adjusting center of rotation (left & down)
        this.bird.anchor.setTo(-0.2,0.5);
        //this.addPipes();
        // add pipes every 1.5sec
        this.timer = game.time.events.loop(1300, this.addPipes, this);
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        game.input.onDown.add(this.jump, this);
        var pauseKEY = game.input.keyboard.addKey(Phaser.Keyboard.P);
        pauseKEY.onDown.add(this.togglePause, this);
        this.jumpSound = game.add.audio('jump');
        this.labelScore = game.add.text(750, 20, "Score: "+score.toString(), {font: "50px Arial", fill:"#000000"});
        this.labelLevel = game.add.text(20, 20, "Level: "+level.toString(), {font: "50px Arial", fill:"#000000"});
        
    },

    update: function(){
        // called 60 times per second.
        if(this.bird.angle < 20){
            this.bird.angle += 1;
        }
        if(this.bird.y < 0 || this.bird.y > 681){
            this.restartGame();
        }
        if(score > 10*level)
        {
            level++;
            this.labelLevel.text = "Level: "+level.toString();
            this.bird.body.gravity.y += 10;
        }
        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    },

    jump: function(){
        if(this.bird.alive == false)
            return;
        this.bird.body.velocity.y = -350;
        var animation = game.add.tween(this.bird);
        //change angle in 100ms
        animation.to({angle: -20}, 100);
        animation.start();
        this.jumpSound.play();
    },

    hitPipe: function(){

        if(this.bird.alive == false)
            return;

        this.bird.alive = false;
        // remove pipes
        game.time.events.remove(this.timer);

        // pause all pipes, stop movement
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame: function(){
        game.state.start('Game_Over');
    },
    
    togglePause: function(){
        game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
        if(game.physics.arcade.isPaused){
            game.time.events.remove(this.timer);
            this.pipes.forEach(function(p){
                p.body.velocity.x = 0;
            }, this);
        }else{
            this.timer = game.time.events.loop(1300, this.addPipes, this);
            this.pipes.forEach(function(p){
                p.body.velocity.x = -200;
            }, this);
        }
    },

    addPipes: function(){
        score++;
        this.labelScore.text = "Score: "+score.toString();
        var rand = Math.floor(Math.random() * 100) + 1;
        var up = rand + 100;
        up = up*-1;
        var pipe1 = game.add.sprite(450, up, 'pipeUp');
        game.physics.arcade.enable(pipe1);
        up = heightOfPipe + up;
        var down = up + diffBetweenPipes;
        down = down + 40;
        var pipe2 = game.add.sprite(450, down, 'pipeDown');
        game.physics.arcade.enable(pipe2);
        pipe1.body.velocity.x = -200;
        pipe1.chechWorldBounds = true;
        pipe1.outOfBoundKill = true;
        pipe2.body.velocity.x = -200;
        pipe2.chechWorldBounds = true;
        pipe2.outOfBoundKill = true;
        this.pipes.add(pipe1);
        this.pipes.add(pipe2);
    },

    addOnePipe: function(x, y){
        var pipe = game.add.sprite(x, y, 'pipe');
        this.pipes.add(pipe);
        game.physics.arcade.enable(pipe);

        // move pipe left as frame changes
        // change it to increase difficulty of game.
        pipe.body.velocity.x = -200;

        pipe.chechWorldBounds = true;
        pipe.outOfBoundKill = true;
    },

    addRowOfPipes: function(){
        score += 1;
        this.labelScore.text = score.toString();
        var hole = Math.floor(Math.random() * 7) + 1;

        for(var i=0; i<11; i++){
            if(i!=hole && i!=hole+1){
                this.addOnePipe(400, i*60 + 10);
            }
        }
    }
};