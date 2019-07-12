var Menu = {

    preload: function(){
        game.load.image('menu', './assets/images/menu2.jpg');
    },

    create: function(){
        //game.add.sprite(0, 0, 'menu');
        game.add.button(0, 0, 'menu', this.startGame, this);
    },

    startGame: function(){
        this.state.start('Game');
    }

};